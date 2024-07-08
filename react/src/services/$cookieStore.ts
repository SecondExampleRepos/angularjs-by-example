// react/src/services/$cookieStore.ts

import { useState } from 'react';

interface CookieStore {
  get: (key: string) => any;
  put: (key: string, value: any) => void;
  remove: (key: string) => void;
}

const useCookieStore = (): CookieStore => {
  const [cookies, setCookies] = useState<{ [key: string]: string }>({});

  const get = (key: string): any => {
    const cookie = cookies[key];
    return cookie ? JSON.parse(cookie) : null;
  };

  const put = (key: string, value: any): void => {
    const newCookies = { ...cookies, [key]: JSON.stringify(value) };
    setCookies(newCookies);
    document.cookie = `${key}=${JSON.stringify(value)}`;
  };

  const remove = (key: string): void => {
    const { [key]: _, ...newCookies } = cookies;
    setCookies(newCookies);
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  return { get, put, remove };
};

export default useCookieStore;
