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
    const handleCookiesChange = () => {
      const currentCookies = getCookies();
      const newCookies: Cookies = { ...cookies };

      for (const key in prevCookies) {
        if (!(key in currentCookies)) {
          delete newCookies[key];
        }
      }

      for (const key in currentCookies) {
        if (currentCookies[key] !== prevCookies[key]) {
          newCookies[key] = currentCookies[key];
        }
      }

      setCookies(newCookies);
      setPrevCookies(currentCookies);
    };

    window.addEventListener('cookiechange', handleCookiesChange);
    return () => window.removeEventListener('cookiechange', handleCookiesChange);
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
    setCookies(prev => ({ ...prev, [name]: value }));
  };

  const removeCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    setCookies(prev => {
      const newCookies = { ...prev };
      delete newCookies[name];
      return newCookies;
    });
  };

  return {
    cookies,
    getCookie: (name: string) => cookies[name],
    setCookie,
    removeCookie,
  };
};

export default useCookies;
