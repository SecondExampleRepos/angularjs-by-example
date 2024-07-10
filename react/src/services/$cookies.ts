// react/src/services/$cookies.ts

import { useState, useEffect } from 'react';

interface Cookies {
  [key: string]: string;
}

const useCookies = () => {
  const [cookies, setCookies] = useState<Cookies>({});
  const [prevCookies, setPrevCookies] = useState<Cookies>({});

  useEffect(() => {
    const pollCookies = () => {
      const currentCookies = getCookies();
      if (JSON.stringify(prevCookies) !== JSON.stringify(currentCookies)) {
        setPrevCookies(currentCookies);
        setCookies(currentCookies);
      }
    };

    const intervalId = setInterval(pollCookies, 1000);
    return () => clearInterval(intervalId);
  }, [prevCookies]);

  useEffect(() => {
    const updateCookies = () => {
      const currentCookies = getCookies();
      let cookiesChanged = false;

      for (const key in prevCookies) {
        if (cookies[key] === undefined) {
          deleteCookie(key);
        }
      }

      for (const key in cookies) {
        const value = cookies[key];
        if (typeof value !== 'string') {
          cookies[key] = '' + value;
        }
        if (cookies[key] !== prevCookies[key]) {
          setCookie(key, cookies[key]);
          cookiesChanged = true;
        }
      }

      if (cookiesChanged) {
        const newCookies = getCookies();
        for (const key in newCookies) {
          if (cookies[key] !== newCookies[key]) {
            if (newCookies[key] === undefined) {
              delete cookies[key];
            } else {
              cookies[key] = newCookies[key];
            }
          }
        }
      }
    };

    updateCookies();
  }, [cookies, prevCookies]);

  const getCookies = (): Cookies => {
    const cookies: Cookies = {};
    document.cookie.split(';').forEach(cookie => {
      const [name, value] = cookie.split('=');
      cookies[name.trim()] = value;
    });
    return cookies;
  };

  const setCookie = (name: string, value: string) => {
    document.cookie = `${name}=${value}`;
  };

  const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  };

  return cookies;
};

export default useCookies;
