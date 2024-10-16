// Converted from src/services/show.fct.js

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowService {
  private readonly API_KEY = '87de9079e74c828116acce677f6f255b';
  private readonly BASE_URL = 'http://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  private makeRequest(url: string, params: any) {
    let requestUrl = `${this.BASE_URL}/${url}?api_key=${this.API_KEY}`;
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        requestUrl += `&${key}=${params[key]}`;
      }
    }
    return this.http.get(requestUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      map(response => response),
      catchError(this.dataServiceError)
    );
  }

  getPremieres() {
    const date = new Date();
    date.setDate(1);
    return this.makeRequest('discover/tv', {
      'first_air_date.gte': date.toISOString().split('T')[0],
      append_to_response: 'genres'
    }).pipe(
      map((data: any) => data.results)
    );
  }

  get(id: string) {
    return this.makeRequest(`tv/${id}`, {});
  }

  getCast(id: string) {
    return this.makeRequest(`tv/${id}/credits`, {});
  }

  search(query: string) {
    return this.makeRequest('search/tv', { query }).pipe(
      map((data: any) => data.results)
    );
  }

  getPopular() {
    return this.makeRequest('tv/popular', {}).pipe(
      map((data: any) => data.results)
    );
  }

  private dataServiceError(errorResponse: any) {
    console.error('XHR Failed for ShowService');
    console.error(errorResponse);
    return of(errorResponse);
  }
}
