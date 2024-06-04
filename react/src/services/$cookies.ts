// react/src/services/$cookies.ts

import { useState, useEffect } from 'react';

interface Cookies {
  [key: string]: string;
}

const useCookies = () => {
  const [cookies, setCookies] = useState<Cookies>({});
  const [prevCookies, setPrevCookies] = useState<Cookies>({});
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const pollCookies = () => {
      const currentCookies = getCookies();
      if (JSON.stringify(prevCookies) !== JSON.stringify(currentCookies)) {
        setPrevCookies(currentCookies);
        setCookies(currentCookies);
        if (initialized) {
          // Trigger re-render or any other side effects
        }
      }
    };

    const intervalId = setInterval(pollCookies, 1000); // Poll every second
    setInitialized(true);

    return () => clearInterval(intervalId);
  }, [prevCookies, initialized]);

  useEffect(() => {
    const updateCookies = () => {
      const currentCookies = getCookies();
      let cookiesChanged = false;

      for (const key in prevCookies) {
        if (!(key in cookies)) {
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
        setCookies(newCookies);
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

  return {
    cookies,
    setCookies,
    getCookies,
    setCookie,
    deleteCookie,
  };
};

export default useCookies;