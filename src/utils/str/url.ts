export function addSearchParams(
  params: URLSearchParams | object = {},
  oriurl: undefined | URL | string = undefined
) {
  const urlInfo = (oriurl instanceof URL) ?
    oriurl :
    new URL(oriurl || window.location.href);
  const searchParams = new globalThis.URLSearchParams(urlInfo.search);
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      searchParams.delete(key);
    } else {
      searchParams.set(key, '' + value);
    }
  });

  urlInfo.search = searchParams.toString();
  const url = urlInfo.toString();
  return url;
}

/**
 * 更新url params
 * @param params
 */
export function replaceSearchParams(params: Record<string, string | undefined | number>) {
  const newUrl = addSearchParams(params, location.href);
  window.history.replaceState('', '', newUrl);
}
