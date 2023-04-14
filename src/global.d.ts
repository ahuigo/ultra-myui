interface String {
  parseStr(): { [key: string]: string; };
  addParams(params: string | Object, withHost?: boolean): string;
}
declare interface Window {
  http_build_query(params: string | Object): string;
  G2: any;
}


// declare global {
//   var First: any;
//   interface Window { First: any; }
// }
declare interface Window { G3: { name: string; }; }


interface Array<T> {
  unique(): Array<T>;
  chunk(n: number): Array<T>[];
  remove(...args: T[]): Array<T>;
}
interface Set<T> {
  // deno-lint-ignore no-explicit-any
  push(...args: any[]): Set<T>;
}

type emptyType = '' | undefined | null;
interface Object {
  filterEmpty<T>(args: Object): T;
}

/*
//refer: https://stackoverflow.com/questions/62286838/how-to-define-global-variable-in-deno
 //Put following code inside one of your used modules;
declare global {
  interface Window { First: any; }
  interface IPost {
    foo: string;
  }
}

export {}; // use some export to mark file as module
**/