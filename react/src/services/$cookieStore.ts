// react/src/services/$cookieStore.ts

import { useRootScope } from '../hooks/useRootScope';

interface CookieStore {
  get: (key: string) => any;
  put: (key: string, value: any) => void;
  remove: (key: string) => void;
}

export const useCookieStore = (): CookieStore => {
  const { state, updateState } = useRootScope();

  const get = (key: string): any => {
    const cookie = state[key];
    return cookie ? JSON.parse(cookie) : null;
  };

  const put = (key: string, value: any): void => {
    const cookieValue = JSON.stringify(value);
    updateState({ [key]: cookieValue });
  };

  const remove = (key: string): void => {
    updateState({ [key]: undefined });
  };

  return {
    get,
    put,
    remove,
  };
};