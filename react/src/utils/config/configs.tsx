// Converted from src/app.config.js

import axios from 'axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export function configureAxiosInterceptors() {
    axios.interceptors.response.use(
        (response: AxiosResponse) => {
            // Request completed successfully
            return response;
        },
        (error) => {
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
        }
    );
}
