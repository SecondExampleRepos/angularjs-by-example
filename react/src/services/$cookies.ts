// react/src/services/$cookies.ts

import { useState, useEffect } from 'react';

// Define the $cookies service
const useCookies = () => {
  const [cookies, setCookies] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchCookies = () => {
      const cookieString = document.cookie;
      const cookieArray = cookieString.split('; ');
      const cookieObject: { [key: string]: string } = {};

      cookieArray.forEach(cookie => {
        const [name, value] = cookie.split('=');
        cookieObject[name] = value;
      });

      setCookies(cookieObject);
    };

    fetchCookies();
    const interval = setInterval(fetchCookies, 1000);

    return () => clearInterval(interval);
  }, []);

  const getCookie = (name: string): string | undefined => {
    return cookies[name];
  };

  const setCookie = (name: string, value: string, days?: number) => {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ''}${expires}; path=/`;
    setCookies(prevCookies => ({ ...prevCookies, [name]: value }));
  };

  const removeCookie = (name: string) => {
    document.cookie = `${name}=; Max-Age=-99999999;`;
    setCookies(prevCookies => {
      const newCookies = { ...prevCookies };
      delete newCookies[name];
      return newCookies;
    });
  };

  return {
    getCookie,
    setCookie,
    removeCookie,
  };
};

export default useCookies;