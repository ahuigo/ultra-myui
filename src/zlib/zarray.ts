/**
 * 永远不要使用for...in array: 它很慢，也不保证元素顺序，还会遍历继承的元素
 */
 Array.prototype.chunk = function(chunk = 2) {
  let i,
    j,
    temparray = [];
  for (i = 0, j = this.length; i < j; i += chunk) {
    temparray.push(this.slice(i, i + chunk));
  }
  return temparray;
};

Array.prototype.unique = function() {
  return [...new Set(this)];
};

Object.defineProperties(Array.prototype, {
  unique: { enumerable: true },
  chunk: { enumerable: true },
});

Object.filterEmpty = function(data: any, empty_list = ['', undefined, null]) {
  for (let [k, v] of Object.entries(data)) {
    if (empty_list.includes(v as any)) {
      delete data[k];
    }
  }
  return data;
};
Array.prototype.remove = function() {
  var what,
    a = arguments,
    L = a.length,
    ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};

export function diffArray<T>(a: T[], b: T[]): T[] {
  const bs = new Set(b);
  return a.filter(x => !bs.has(x));
}

export function aheadElement<
  T extends Record<PropertyKey, any>,
  K extends keyof T
>(arr: T[], key: K, value: T[K]): T[] {
  const brr: T[] = [];
  let el: T | undefined = undefined;
  for (const ele of arr) {
    if (ele[key] == value) {
      el = ele;
    } else {
      brr.push(ele);
    }
  }
  if (el) {
    brr.unshift(el);
  }
  return brr;
}
