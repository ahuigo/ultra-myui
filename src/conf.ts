import { configFactory } from "./conf/defaultConf.ts";
import localConfig from "./conf/localConf.ts";
// deno-lint-ignore prefer-const
let APP_ENV = 'dev';
console.log(APP_ENV);


const config = configFactory();

// @ts-ignore-next
globalThis._config = config;
// @ts-ignore: inject from k8s
if (APP_ENV == 'local') {
  Object.assign(config, localConfig);
} else {
  // @ts-ignore: inject from k8s
  Object.assign(config, globalThis._conf_k8s || {});
}


export default config;