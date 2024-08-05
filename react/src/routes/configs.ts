import axios from 'axios';

// Interceptor for handling HTTP responses
const interceptor = (error: any) => {
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

// Add the interceptor to axios
axios.interceptors.response.use(
    response => response, // Request completed successfully
    interceptor
);
