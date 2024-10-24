// Converted from src/services/show.fct.js

import axios, { AxiosRequestConfig } from 'axios';
// Correcting the import to use the main 'date-fns' package
import { format } from 'date-fns';
import API_KEY from '../utils/constants/API_KEY';
import BASE_URL from '../utils/constants/BASE_URL';

const makeRequest = async (url: string, params: Record<string, any>) => {
    const requestUrl = `${BASE_URL}/${url}?api_key=${API_KEY}`;
    const queryString = Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
    const fullUrl = `${requestUrl}&${queryString}`;

    const config: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.get(fullUrl, config);
        return response.data;
    } catch (error) {
        console.error('XHR Failed for ShowService', error);
        throw error;
    }
};

const getResults = async (url: string, params: Record<string, any>) => {
    const data = await makeRequest(url, params);
    return data.results;
};

const getPremieres = async () => {
    const date = new Date();
    date.setDate(1);
    const formattedDate = format(date, 'dd-MM-yyyy');
    return getResults('discover/tv', {
        'first_air_date.gte': formattedDate,
        append_to_response: 'genres'
    });
};

const get = async (id: number) => {
    return await makeRequest(`tv/${id}`, {});
};

const getCast = async (id: number) => {
    return await makeRequest(`tv/${id}/credits`, {});
};

const search = async (query: string) => {
    return getResults('search/tv', { query });
};

const getPopular = async () => {
    return getResults('tv/popular', {});
};

const ShowService = {
    getPremieres,
    get,
    search,
    getPopular,
    getCast
};

export default ShowService;
