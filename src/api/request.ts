import conf from '@/conf.ts'
export function get(url:string|URL|Request, init:RequestInit) {
  const config=Object.assign({method:"GET", init})
  return request(url, config)
}
export function post(url:string|URL|Request, init:RequestInit) {
  const config=Object.assign({method:"POST", init})
  return request(url, config)
}
export function del(url:string|URL|Request, init:RequestInit) {
  const config=Object.assign({method:"DELETE", init})
  return request(url, config)
}
export function patch(url:string|URL|Request, init:RequestInit) {
  const config=Object.assign({method:"PATCH", init})
  return request(url, config)
}


class Callable extends Function {
  constructor() {
    super('return arguments.callee._call(...arguments)')
  }
}
type ResponseHandler = <T>(resp: Response, input: string|URL|Request) => Promise<T>
class AjaxFactory extends Callable{
  #defaultInit:RequestInit = {}
  #responseHandler?: ResponseHandler = undefined
  constructor(){
    super()
  }
  setResponseHandler(responseHandler: ResponseHandler) {
    this.#responseHandler = responseHandler;
  }
   _call(input:string|URL|Request, init?:RequestInit) {
        const newinit = {...this.#defaultInit, ...(init||{})}
        const resp = fetch(input, newinit)
        return resp.then(response=> {
          if(this.#responseHandler) return this.#responseHandler(response, input)
          return response
        })
  }
}
export type AjaxFactoryF = AjaxFactory & AjaxFactory['_call']
// const ft=<AjaxFactoryF>(new AjaxFactory())
// ft("a.com").then(r=>console.log(r))

function extend(
  defaultInit: RequestInit,
  responseHandler: ResponseHandler,
) {
  const fetchFn = <M>(input:string|URL|Request, init?:RequestInit):Promise<M>=>{
    const newinit = {...defaultInit, ...(init||{})}
    const resp = fetch(input, newinit)
    return resp.then(response=> {
      return responseHandler<M>(response, input)
    })
  }
  return fetchFn
}

const request = extend({
  mode:"cors",
  credentials: 'include', // 默认请求是否带上cookie
}, async <T>(response: Response, input: string | URL | Request):Promise<T> => {
  if (response && response.status) {
    const { status, url } = response;
    const text = await response.text();
    let msg = text;
    let responseObj: any;

    if (status == 401) { 
      loginRedirect()
    }

    // 处理异常消息
    try {
      responseObj = JSON.parse(text);
      const handleMsg = (o:any):string => {
        return (o&& o?.error) as string
      }
      msg = handleMsg(responseObj);
    } catch (error) {
      msg = text+`(${url})`
      console.error(error);
    }
    if (status == 403) {
      // responseObj.url = getUrlFromText(msg)
      // responseObj.btnText = `申请权限(ApplyForPermission)`
    }

    if (status >= 403 || status == 400) {
      if (responseObj?.url && responseObj.btnText) {
        // const btn = React.createElement(
        //   "button", { style: { color: "green" } }, responseObj.btnText
        // )
        // notification.error({
        //   message: msg || `API ERROR(${status}`,
        //   description: ` `,
        //   onClick: () => {
        //     window.location.href = `${responseObj.url}`
        //   },
        //   btn: btn,
        // });
      } else {
        // notification.error({
        //   message: msg || `API ERROR(${status}`,
        //   description: ` `,
        // });
      }
    }
    if (msg && status !== 401) {
      throw msg;
    }

    return responseObj;
  }

  if (!response) {
    const url = input +''
    const msg = `can't connect: ${url.slice(0, 200)}`;
    console.error({
      description: msg,
      message: 'network error',
    });
    throw msg;
  }
  return response as T;
});

function loginRedirect() {
  const loginURLInfo = new URL(conf.account_api);
  loginURLInfo.pathname = '/mauth/login';
  const search = new URLSearchParams({
    redirect_uri: location.href,
  });
  loginURLInfo.search = search.toString();
  window.location.href = loginURLInfo.toString();
}

export default request