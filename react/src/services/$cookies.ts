import { useState, useEffect } from 'react';

const useCookies = () => {
    const [cookies, setCookies] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const getCookies = () => {
            const cookiesString = document.cookie;
            const cookiesArray = cookiesString.split('; ');
            const cookiesObject: { [key: string]: string } = {};
            cookiesArray.forEach(cookie => {
                const [name, value] = cookie.split('=');
                cookiesObject[name] = value;
            });
            setCookies(cookiesObject);
        };

        getCookies();
        const interval = setInterval(getCookies, 1000); // Polling interval similar to AngularJS's $browser.addPollFn

        return () => clearInterval(interval);
    }, []);

    const get = (name: string) => {
        return cookies[name] ? JSON.parse(cookies[name]) : undefined;
    };

    const put = (name: string, value: any) => {
        const valueString = JSON.stringify(value);
        document.cookie = `${name}=${valueString}`;
        setCookies(prevCookies => ({ ...prevCookies, [name]: valueString }));
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