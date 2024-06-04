import { useEffect, useState } from 'react';

// Define the type for the cookies state
interface CookiesState {
  [key: string]: string;
}

// Utility function to get cookies from the document
const getCookies = (): CookiesState => {
  const cookies: CookiesState = {};
  document.cookie.split(';').forEach(cookie => {
    const [name, value] = cookie.split('=').map(c => c.trim());
    if (name && value) {
      cookies[name] = value;
    }
  });
  return cookies;
};

// Custom hook to manage cookies
const useCookies = () => {
  const [cookies, setCookies] = useState<CookiesState>(getCookies());

  useEffect(() => {
    const handleCookiesChange = () => {
      setCookies(getCookies());
    };

    // Polling for cookie changes
    const intervalId = setInterval(handleCookiesChange, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const updateCookies = (newCookies: Partial<CookiesState>) => {
    Object.keys(newCookies).forEach(key => {
      document.cookie = `${key}=${newCookies[key]}`;
    });
    setCookies(getCookies());
  };

  const removeCookie = (key: string) => {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    setCookies(getCookies());
  };

  return {
    cookies,
    updateCookies,
    removeCookie,
  };
};

export default useCookies;