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
      if (JSON.stringify(currentCookies) !== JSON.stringify(prevCookies)) {
        setPrevCookies(currentCookies);
        setCookies(currentCookies);
      }
    };

    const intervalId = setInterval(pollCookies, 1000);
    return () => clearInterval(intervalId);
  }, [prevCookies]);

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
    setCookie,
    removeCookie,
  };
};

export default useCookies;