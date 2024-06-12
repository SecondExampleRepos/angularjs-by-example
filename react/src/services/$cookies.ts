// react/src/services/$cookies.ts

import { useState, useEffect } from 'react';

const useCookies = () => {
  const [cookies, setCookies] = useState<{ [key: string]: string }>({});
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const getCookies = () => {
      const cookiesString = document.cookie;
      const cookiesArray = cookiesString.split('; ');
      const cookiesObject: { [key: string]: string } = {};
      cookiesArray.forEach(cookie => {
        const [name, value] = cookie.split('=');
        cookiesObject[name] = value;
      });
      return cookiesObject;
    };

    const updateCookies = () => {
      const newCookies = getCookies();
      setCookies(newCookies);
    };

    if (!initialized) {
      updateCookies();
      setInitialized(true);
    }

    const intervalId = setInterval(updateCookies, 1000);

    return () => clearInterval(intervalId);
  }, [initialized]);

  const get = (name: string) => {
    return cookies[name] ? JSON.parse(cookies[name]) : undefined;
  };

  const put = (name: string, value: any) => {
    const jsonString = JSON.stringify(value);
    document.cookie = `${name}=${jsonString}`;
    setCookies(prevCookies => ({ ...prevCookies, [name]: jsonString }));
  };

  const remove = (name: string) => {
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