﻿// Converted from src/services/show.fct.js

import axios from 'axios';
import moment from 'moment';

const API_KEY = '87de9079e74c828116acce677f6f255b';
const BASE_URL = 'http://api.themoviedb.org/3';

type ShowType = {
    id: number;
    name: string;
};

type GenreType = {
    id: number;
    name: string;
};

type CastType = {
    cast: Array<{ name: string }>;
};

async function makeRequest(url: string, params: Record<string, any>) {
    const requestUrl = `${BASE_URL}/${url}?api_key=${API_KEY}&${new URLSearchParams(params).toString()}`;
    try {
        const response = await axios.get(requestUrl, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('XHR Failed for ShowService', error);
        throw error;
    }
}

export default function ShowService() {
    async function getPremieres(): Promise<ShowType[]> {
        const date = new Date();
        date.setDate(1);
        const data = await makeRequest('discover/tv', { 
            'first_air_date.gte': moment(date).format('DD-MM-YYYY'), 
            append_to_response: 'genres' 
        });
        return data.results;
    }

    async function get(id: number): Promise<ShowType> {
        return makeRequest(`tv/${id}`, {});
    }

    async function getCast(id: number): Promise<CastType> {
        return makeRequest(`tv/${id}/credits`, {});
    }

    async function search(query: string): Promise<ShowType[]> {
        const data = await makeRequest('search/tv', { query });
        return data.results;
    }

    async function getPopular(): Promise<ShowType[]> {
        const data = await makeRequest('tv/popular', {});
        return data.results;
    }

    return { getPremieres, get, search, getPopular, getCast };
}
