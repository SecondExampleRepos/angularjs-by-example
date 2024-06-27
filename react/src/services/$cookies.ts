// react/src/services/$cookies.ts

import { useState, useEffect } from 'react';

// Define the useCookies hook
export const useCookies = () => {
  const [cookies, setCookies] = useState<{ [key: string]: string }>({});
  const [prevCookies, setPrevCookies] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchCookies = () => {
      const cookieString = document.cookie;
      const cookieArray = cookieString.split('; ');
      const cookieObj: { [key: string]: string } = {};

      cookieArray.forEach(cookie => {
        const [name, value] = cookie.split('=');
        cookieObj[name] = value;
      });

      setPrevCookies(cookies);
      setCookies(cookieObj);
    };

    fetchCookies();
    const interval = setInterval(fetchCookies, 1000);

    return () => clearInterval(interval);
  }, [cookies]);

  useEffect(() => {
    const updateCookies = () => {
      for (const key in prevCookies) {
        if (!(key in cookies)) {
          document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
      }

      for (const key in cookies) {
        if (cookies[key] !== prevCookies[key]) {
          document.cookie = `${key}=${cookies[key]}; path=/;`;
        }
      }
    };

    updateCookies();
  }, [cookies, prevCookies]);

  const getCookie = (name: string) => {
    return cookies[name] || null;
  };

  const setCookie = (name: string, value: string) => {
    setCookies(prev => ({ ...prev, [name]: value }));
  };

  const removeCookie = (name: string) => {
    setCookies(prev => {
      const newCookies = { ...prev };
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
