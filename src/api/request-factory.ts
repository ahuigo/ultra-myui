import { addSearchParams } from '@/utils/str/url.ts';

type ResponseHandler<T> = (resp: Response, req: Request) => Promise<any>;
type ErrorHandler = (err: any, req: Request) => void;

interface RequestInitExt extends RequestInit {
  // deno-lint-ignore no-explicit-any
  data?: any;
  params?: object | URLSearchParams;
  json?: Record<string, any> | string | number | Array<unknown>;
}

/**
 *
 * @example
   const ajax=new AjaxFactoryAlias(
    {
      mode: "cors",
      credentials: 'include',
    }, async (resp: Response, req:Request)=> {
     const text = await resp.text();
     return JSON.parse(text)
   })
   ajax.post("a.com",{data:{}}).then(data=>console.log(data))
 * @param headers
 * @param key
 * @param value
 * @returns
 */
function addHeader(headers: HeadersInit, key: string, value: string) {
  if (headers instanceof Array) {
    headers.push([key, value]);
  } else if (headers instanceof Headers) {
    headers.set(key, value);
  } else {
    headers[key] = value;
  }
  return headers;
}

// deno-lint-ignore no-unused-vars
function addHeaders(headers: HeadersInit, newHeaders: Record<string, string>) {
  for (const [key, value] of Object.entries(newHeaders)) {
    addHeader(headers, key, value);
  }
  return headers;
}


class Callable extends Function {
  constructor() {
    super('return arguments.callee._call(...arguments)');
  }
}


export type FetchTracer = (req: Request) => Promise<any>;

class AjaxFactory<T = any> extends Callable {
  #defaultInit: RequestInit = {};
  #responseHandler: ResponseHandler<T>;
  #errorHandler: ErrorHandler;
  #fetchTracer?: FetchTracer;


  constructor(defaultInit: RequestInit, responseHandler: ResponseHandler<T>, errorHandler: ErrorHandler) {
    super();
    this.#defaultInit = defaultInit || {};
    this.#responseHandler = responseHandler;
    this.#errorHandler = errorHandler;
  }

  // fetch
  async _call<M = any>(input: string | URL, init?: RequestInitExt): Promise<M> {
    if (init?.data) {
      if (typeof init.data === 'string'
        || init.data instanceof URLSearchParams
      ) {
        init.headers = addHeader(init?.headers ?? {}, 'Content-Type', 'application/x-www-form-urlencoded');
        init.body = init.data;
      } else if (
        init.data instanceof FormData
        || init.data instanceof Blob
      ) {
        init.body = init.data;
      } else {
        init.json = init.data;
      }
      delete init.data;
    }
    if (init?.params) {
      input = addSearchParams(init.params, input);
      delete init.params;
    }
    if (init?.json) {
      init.headers = addHeader(init?.headers ?? {}, 'Content-Type', 'application/json');
      init.body = JSON.stringify(init.json);
      delete init.json;
    }
    const newinit = { ...this.#defaultInit, ...(init || {}) };
    const req = new Request(input, newinit);
    try {
      let response: Response;
      if (this.#fetchTracer) {
        response = await this.#fetchTracer(req);
      } else {
        response = await fetch(req);
      }
      const handledResp = this.#responseHandler!(response, req) as M;
      // const handledResp = await fetch(req).then(response => {
      //   return this.#responseHandler!(response, req);
      // }) as Promise<M>;
      return handledResp;
    } catch (e) {
      return this.#errorHandler(e, req) as M;
    }
  }

  withHeader(key: string, value: string) {
    this.#defaultInit.headers = addHeader(this.#defaultInit.headers ?? {}, key, value);
    return this;
  }

  withTracer(tracer: FetchTracer) {
    this.#fetchTracer = tracer;
  }

  get(url: string | URL, init?: RequestInitExt) {
    const options = Object.assign({ method: "GET", }, init);
    return this._call(url, options);
  }
  post(url: string | URL, init?: RequestInitExt) {
    const options = Object.assign({ method: "POST" }, init);
    return this._call(url, options);
  }
  delete(url: string | URL, init?: RequestInitExt) {
    const options = Object.assign({ method: "DELETE" }, init);
    return this._call(url, options);
  }
  put(url: string | URL, init?: RequestInitExt) {
    const options = Object.assign({ method: "PUT" }, init);
    return this._call(url, options);
  }
  patch(url: string | URL, init?: RequestInitExt) {
    const options = Object.assign({ method: "PUT" }, init);
    return this._call(url, options);
  }
}

type AjaxFactoryF = AjaxFactory & AjaxFactory['_call'];
const AjaxFactoryAlias = AjaxFactory as new (
  ...args: ConstructorParameters<typeof AjaxFactory>
) => AjaxFactoryF;

export { AjaxFactoryAlias as AjaxFactory };
export default AjaxFactory as typeof AjaxFactoryAlias;
