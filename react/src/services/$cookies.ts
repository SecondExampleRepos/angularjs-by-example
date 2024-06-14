// react/src/services/$cookies.ts

import { useState, useEffect } from 'react';

interface Cookies {
  [key: string]: string;
}

const useCookies = () => {
  const [cookies, setCookies] = useState<Cookies>({});
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const fetchCookies = () => {
      const cookieString = document.cookie;
      const cookieArray = cookieString.split('; ');
      const cookieObj: Cookies = {};

      cookieArray.forEach(cookie => {
        const [name, value] = cookie.split('=');
        cookieObj[name] = value;
      });

      setCookies(cookieObj);
    };

    fetchCookies();
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      const cookieString = Object.entries(cookies)
        .map(([name, value]) => `${name}=${value}`)
        .join('; ');

      document.cookie = cookieString;
    }
  }, [cookies, initialized]);

  const getCookie = (name: string): string | null => {
    return cookies[name] || null;
  };

  const setCookie = (name: string, value: string): void => {
    setCookies(prevCookies => ({
      ...prevCookies,
      [name]: value,
    }));
  };

  const removeCookie = (name: string): void => {
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