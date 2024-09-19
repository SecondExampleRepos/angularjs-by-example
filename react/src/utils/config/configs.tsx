// Converted from src/app.config.js

import axios from 'axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export function setupAxiosInterceptors() {
    axios.interceptors.response.use(
        (response: AxiosResponse) => {
            // Request completed successfully
            return response;
        },
        (error) => {
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        console.error('You are unauthorised to access the requested resource (401)');
                        break;
                    case 404:
                        console.error('The requested resource could not be found (404)');
                        break;
                    case 500:
                        console.error('Internal server error (500)');
                        break;
                    default:
                        console.error('An error occurred', error);
                }
            }
            return Promise.reject(error);
        }
    );
}
