// Converted from src/app.config.js

import axios, { AxiosResponse } from 'axios';

type InterceptorResponse = AxiosResponse<any>;

const interceptor = (error: any): Promise<InterceptorResponse> => {
    if (error.response) {
        if (error.response.status === 401) {
            console.error('You are unauthorised to access the requested resource (401)');
        } else if (error.response.status === 404) {
            console.error('The requested resource could not be found (404)');
        } else if (error.response.status === 500) {
            console.error('Internal server error (500)');
        }
    }
    return Promise.reject(error);
};

axios.interceptors.response.use(
    response => response, // Request completed successfully
    interceptor
);

export default interceptor;
