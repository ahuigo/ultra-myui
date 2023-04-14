export function configFactory() {
  return {
    user_api: `http://local.com:8008/api/v1`,
  };
}

export type ConfType = ReturnType<typeof configFactory>;