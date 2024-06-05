import axios from 'axios';
import moment from 'moment';

const API_KEY = '87de9079e74c828116acce677f6f255b';
const BASE_URL = 'http://api.themoviedb.org/3';

interface ShowService {
    getPremieres: () => Promise<any>;
    get: (id: string) => Promise<any>;
    search: (query: string) => Promise<any>;
    getPopular: () => Promise<any>;
    getCast: (id: string) => Promise<any>;
}

const showService: ShowService = {
    getPremieres,
    get,
    search,
    getPopular,
    getCast
};

function makeRequest(url: string, params: Record<string, any>) {
    let requestUrl = `${BASE_URL}/${url}?api_key=${API_KEY}`;
    Object.keys(params).forEach(key => {
        requestUrl += `&${key}=${params[key]}`;
    });

    return axios.get(requestUrl, {
        headers: {
            'Content-Type': 'application/json'
        },
        cache: true
    })
    .then(response => response.data)
    .catch(dataServiceError);
}

function getPremieres() {
    const date = new Date();
    date.setDate(1);
    return makeRequest('discover/tv', {
        'first_air_date.gte': moment(date).format('DD-MM-YYYY'),
        append_to_response: 'genres'
    }).then(data => data.results);
}

function get(id: string) {
    return makeRequest(`tv/${id}`, {});
}

function getCast(id: string) {
    return makeRequest(`tv/${id}/credits`, {});
}

function search(query: string) {
    return makeRequest('search/tv', { query }).then(data => data.results);
}

function getPopular() {
    return makeRequest('tv/popular', {}).then(data => data.results);
}

function dataServiceError(error: any) {
    console.error('XHR Failed for ShowService');
    console.error(error);
    return error;
}

export default showService;