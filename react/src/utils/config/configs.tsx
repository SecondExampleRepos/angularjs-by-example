// Converted from src/app.config.js

import axios, { AxiosResponse } from 'axios';

export function configs() {
    const interceptor = (response: AxiosResponse) => {
        if (response.status === 401) {
            console.error('You are unauthorised to access the requested resource (401)');
        } else if (response.status === 404) {
            console.error('The requested resource could not be found (404)');
        } else if (response.status === 500) {
            console.error('Internal server error (500)');
        }
        return Promise.reject(response);
    };

    axios.interceptors.response.use(
        response => response, // Request completed successfully
        interceptor
    );
}
