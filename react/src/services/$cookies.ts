// react/src/services/$cookies.ts

import { useState, useEffect } from 'react';

interface Cookies {
  [key: string]: string;
}

const useCookies = () => {
  const [cookies, setCookies] = useState<Cookies>({});
  const [prevCookies, setPrevCookies] = useState<Cookies>({});

  const getCookies = (): Cookies => {
    const cookies: Cookies = {};
    document.cookie.split(';').forEach(cookie => {
      const [name, value] = cookie.split('=');
      cookies[name.trim()] = value;
    });
    return cookies;
  };

  const updateCookies = () => {
    const currentCookies = getCookies();
    setPrevCookies(cookies);
    setCookies(currentCookies);
  };

  useEffect(() => {
    const interval = setInterval(updateCookies, 1000);
    return () => clearInterval(interval);
  }, [cookies]);

  useEffect(() => {
    const newCookies: Cookies = { ...cookies };
    for (const key in prevCookies) {
      if (!(key in cookies)) {
        document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      }
    }
    for (const key in cookies) {
      if (cookies[key] !== prevCookies[key]) {
        document.cookie = `${key}=${cookies[key]}`;
      }
    }
  }, [cookies]);

  const get = (name: string): string | undefined => {
    return cookies[name];
  };

  const put = (name: string, value: string) => {
    setCookies(prev => ({ ...prev, [name]: value }));
  };

  const remove = (name: string) => {
    setCookies(prev => {
      const newCookies = { ...prev };
      delete newCookies[name];
      return newCookies;
    });
  };

  return { get, put, remove };
};

export default useCookies;
