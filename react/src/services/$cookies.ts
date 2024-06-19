// react/src/services/$cookies.ts

import { useRootScope } from '../hooks/useRootScope';

interface Cookies {
  [key: string]: string;
}

const useCookies = () => {
  const { state, updateState } = useRootScope();
  let cookies: Cookies = {};

  const getCookies = (): Cookies => {

    const cookieString = document.cookie;
    const cookieArray = cookieString.split('; ');
    const cookies: Cookies = {};

    Object.keys(newCookies).forEach(key => {
      document.cookie = `${key}=${newCookies[key]}; path=/`;
    });
    cookies = { ...cookies, ...newCookies };
    updateState({ cookies });
      const [name, value] = cookie.split('=');

    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    const { [name]: _, ...rest } = cookies;
    cookies = rest;
    updateState({ cookies });
  };

    return cookies;
  };
    return cookies;
  };

  const setCookies = (newCookies: Cookies) => {

    Object.keys(newCookies).forEach(key => {
      document.cookie = `${key}=${newCookies[key]}; path=/`;
    });
    cookies = { ...cookies, ...newCookies };
    updateState({ cookies });

    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    const { [name]: _, ...rest } = cookies;
    cookies = rest;
    updateState({ cookies });
  };
    cookies = { ...cookies, ...newCookies };
    updateState({ cookies });
  };

  const deleteCookie = (name: string) => {

    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    const { [name]: _, ...rest } = cookies;
    cookies = rest;
    updateState({ cookies });
  };
    const { [name]: _, ...rest } = cookies;
    cookies = rest;
    updateState({ cookies });
  };

  return {
    getCookies,
    setCookies,
    deleteCookie,
  };
};

export default useCookies;