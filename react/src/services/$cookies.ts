// react/src/services/$cookies.ts

import { useState, useEffect } from 'react';

const useCookies = () => {
  const [cookies, setCookies] = useState<{ [key: string]: string }>({});
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const pollCookies = () => {
      const newCookies = getCookiesFromBrowser();
      if (JSON.stringify(newCookies) !== JSON.stringify(cookies)) {
        setCookies(newCookies);
        if (initialized) {
          // Trigger re-render or any other side effect
        }
      }
    };

    const intervalId = setInterval(pollCookies, 1000); // Poll every second

    setInitialized(true);

    return () => {
      clearInterval(intervalId);
    };
  }, [cookies, initialized]);

  const getCookiesFromBrowser = (): { [key: string]: string } => {
    const cookieString = document.cookie;
    const cookieArray = cookieString.split('; ');
    const cookieObject: { [key: string]: string } = {};
    cookieArray.forEach(cookie => {
      const [key, value] = cookie.split('=');
      cookieObject[key] = value;
    });
    return cookieObject;
  };

  const get = (key: string): string | null => {
    return cookies[key] || null;
  };

  const put = (key: string, value: string): void => {
    document.cookie = `${key}=${value}`;
    setCookies(prevCookies => ({ ...prevCookies, [key]: value }));
  };

  const remove = (key: string): void => {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    const { [key]: _, ...rest } = cookies;
    setCookies(rest);
  };

  return {
    get,
    put,
    remove,
  };
};

export default useCookies;