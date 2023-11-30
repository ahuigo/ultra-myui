import React from 'react';
import conf from '@/conf.ts';
import { AjaxFactory } from './request-factory.ts';

// const codeMessage = {
//     200: '服务器成功返回请求的数据。',
//     201: '新建或修改数据成功。',
//     202: '一个请求已经进入后台排队（异步任务）。',
//     204: '删除数据成功。',
//     400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//     401: '用户没有权限（令牌、用户名、密码错误）。',
//     403: '用户得到授权，但是访问是被禁止的。',
//     404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//     406: '请求的格式不可得。',
//     410: '请求的资源被永久删除，且不会再得到的。',
//     422: '当创建一个对象时，发生一个验证错误。',
//     500: '服务器发生错误，请检查服务器。',
//     502: '网关错误。',
//     503: '服务不可用，服务器暂时过载或维护。',
//     504: '网关超时。',
// };


/**
 * reponse处理程序
 */
const responseHandler = async <T = any>(response: Response, request: Request): Promise<T> => {
  // const { request, response, name, data } = error;
  if (request?.mode == 'no-cors') {
    return "" as T;
  } else if (response?.status) {
    // const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    const text = await response.text();
    let errmsg = text;
    let responseObj: any;
    handleAbort(text);

    // 1. 处理401
    if (status == 401) {
      loginRedirect();
    }

    // 2. 处理异常消息
    try {
      responseObj = JSON.parse(text);
      errmsg = handleMsg(responseObj, text);
    } catch (error) {
      errmsg = text + `(${url})`;
    }

    if (status < 400) {
      return (responseObj || text) as T;
    }
    if (status == 403) {
      responseObj.url = getUrlFromText(errmsg || text);
      responseObj.btnText = `ApplyForPermission`;
    }

    if (status >= 400) {
      if (responseObj?.url && responseObj.btnText) {
        const msg = errmsg || `API ERROR(${status})`;
        alert(msg)
        // const btn = React.createElement(
        //   "button", { style: { color: "green" } }, responseObj.btnText
        // );
        // notification.error({
        //   message: errmsg || `API ERROR(${status}`,
        //   description: ` `,
        //   onClick: () => {
        //     window.location.href = `${responseObj.url}`;
        //   },
        //   btn: btn,
        // });
      } else {
        alert(errmsg || `API ERROR(${status})`)
        // notification.error({
        //   message: errmsg || `API ERROR(${status}`,
        //   description: ` `,
        // });
      }
      responseObj._skip_notify = true;
      throw responseObj;
    }
    return responseObj;
  } else {
    let msg = `can't connect: ${(request?.url)?.slice(0, 200)}`;
    throw msg;
  }
};


/**
 *
 */
export function loginRedirect() {
  const loginURLInfo = new URL(conf.user_api + '/login');
  const search = new URLSearchParams({
    redirect_uri: location.href,
  });
  loginURLInfo.search = search.toString();
  window.location.href = loginURLInfo.toString();
}

/**
 * 处理abort
 * @param name
 */
const handleAbort = (name: string) => {
  if (name === 'AbortError') {
    throw name;
  }
};

/**
 * 不同接口给的message字段不同, 故逐一检测是message字段的合法性, 返回合法且存在的message
 * @param responseObj
 * @param text
 * @returns
 */
const handleMsg = (responseObj: any, text: string) => {
  const msgProperties = ['message'];
  for (const property of msgProperties) {
    if (property in responseObj) {
      const msg = responseObj[property];
      if (typeof msg === 'string') {
        return msg;
      } else if (Array.isArray(msg)) {
        return msg.join(' ');
      }
    }
  }
  return text;
};


function getUrlFromText(msg: any): string {
  if (typeof msg === 'string') {
    const match = /http(?:s?):\/\/\w[^\s"'|}]+/.exec(msg.replaceAll(`\\u0026`, '&'));
    if (match) {
      return match[0];
    }
  }
  return '';
}

function notificationError(arg: {
  message: string,
  [key: string]: any,
}) {
  alert(arg.message);
}
const notification = {
  error: notificationError,
};

function errorHander(err: any, req: Request) {
  const url = req.url;
  const msg = `can't access: ${url.slice(0, 200)}\n`;
  if (!err?._skip_notify) {
    const msg2 = msg + ' ' + JSON.stringify(err, null, 2);
    notification.error({
      message: msg2,
    });
  }
  throw { err: msg };
}

const request = new AjaxFactory(
  {
    // mode: "cors",
    credentials: 'include', // 默认请求带上cookie
  },
  responseHandler,
  errorHander,
);
// request.withTracer((req: Request) => {
//   return traceFetchWrapper(req);
// })

export { request };
export default request;
