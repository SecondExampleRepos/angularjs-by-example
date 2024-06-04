import { useState, useEffect } from 'react';

interface Cookies {
  [key: string]: string;
}

const useCookies = () => {
  const [cookies, setCookies] = useState<Cookies>({});
  const [prevCookies, setPrevCookies] = useState<Cookies>({});

  const updateCookies = () => {
    const newCookies = getCookies();
    if (JSON.stringify(newCookies) !== JSON.stringify(prevCookies)) {
      setPrevCookies(newCookies);
      setCookies(newCookies);
    }
  };

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
    updateCookies();
  };

  const removeCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    updateCookies();
  };

  useEffect(() => {
    updateCookies();
    const interval = setInterval(updateCookies, 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    cookies,
    setCookie,
    removeCookie,
  };
};

export default useCookies;