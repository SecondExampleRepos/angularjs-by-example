// react/src/services/$cookies.ts

import { useState, useEffect } from 'react';

const useCookies = () => {
    const [cookies, setCookies] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchCookies = async () => {
            try {
                // Fetch initial cookies from the server or document.cookie
                const response = await fetch('/api/cookies'); // Replace with actual API endpoint
                const data = await response.json();
                setCookies(data);
            } catch (error) {
                console.error('Error fetching cookies:', error);
            }
        };

        fetchCookies();
    }, []);

    const getCookie = (name: string): string | null => {
        return cookies[name] || null;
    };

    const setCookie = (name: string, value: string): void => {
        setCookies((prevCookies) => ({
            ...prevCookies,
            [name]: value,
        }));
        // Update the cookie on the server or document.cookie
        document.cookie = `${name}=${value}`;
    };

    const removeCookie = (name: string): void => {
        setCookies((prevCookies) => {
            const newCookies = { ...prevCookies };
            delete newCookies[name];
            return newCookies;
        });
        // Remove the cookie from the server or document.cookie
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    };

    return {
        getCookie,
        setCookie,
        removeCookie,
    };
};

export default useCookies;