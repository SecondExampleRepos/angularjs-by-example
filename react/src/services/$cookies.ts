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
  }, []);

  const get = (name: string): string | null => {
    return cookies[name] || null;
  };

  const put = (name: string, value: string): void => {
    document.cookie = `${name}=${value}`;
    setCookies(prevCookies => ({ ...prevCookies, [name]: value }));
  };

  const remove = (name: string): void => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    setCookies(prevCookies => {
      const newCookies = { ...prevCookies };
      delete newCookies[name];
      return newCookies;
    });
  };

  return {
    get,
    put,
    remove,
  };
};

export default useCookies;