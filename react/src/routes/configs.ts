import axios from 'axios';

// Define a function to handle HTTP request errors
function handleError(error: any) {
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

// Define a function to handle HTTP request success
function handleSuccess(response: any) {
    // Request completed successfully
    return response;
}

// Create an Axios interceptor
axios.interceptors.response.use(handleSuccess, handleError);
