// Derived from src/services/show.fct.js

export type ShowServiceData = {
    getPremieres: () => Promise<TVShow[]>;
    get: (id: number) => Promise<TVShowDetails>;
    search: (query: string) => Promise<TVShow[]>;
    getPopular: () => Promise<TVShow[]>;
    getCast: (id: number) => Promise<Cast[]>;
};

export type TVShow = {
    id: number;
    name: string;
    // Add other relevant fields based on the API response
};

export type TVShowDetails = {
    id: number;
    name: string;
    genres: Genre[];
    // Add other relevant fields based on the API response
};

export type Cast = {
    id: number;
    name: string;
    character: string;
    // Add other relevant fields based on the API response
};

export type Genre = {
    id: number;
    name: string;
};

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

export type HttpRequestConfig = {
    url: string;
    method: HttpMethod;
    headers: Record<string, string>;
    cache: boolean;
};

export type HttpResponse<T> = {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    config: HttpRequestConfig;
    request?: any;
};

export type ErrorResponse = {
    message: string;
    status: number;
    // Add other relevant fields based on the error response
};
