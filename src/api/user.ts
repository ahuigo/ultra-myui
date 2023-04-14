import request from "./request.ts";
import conf from "@/conf.ts";
let loginName = "";

export function getLoginName(): Promise<string> {
  if (loginName) {
    return Promise.resolve(loginName);
  }
  const url = conf.user_api + '/user';
  return request(url).then((resp: any) => {
    if (resp.username) {
      loginName = resp.username;
    }
    return loginName;
  });
}

export function getLogoutUrl() {
  let url = 'http://local.com';
  if (typeof document !== "undefined") {
    url = conf.user_api + '/logout?redirect_uri=' +
      encodeURIComponent(window.document?.location?.href);
  }
  return url;
}