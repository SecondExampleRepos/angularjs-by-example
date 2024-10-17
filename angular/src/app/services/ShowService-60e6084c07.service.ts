// Converted from src/services/show.fct.js

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_KEY = '87de9079e74c828116acce677f6f255b';
const BASE_URL = 'http://api.themoviedb.org/3';

@Injectable({
  providedIn: 'root'
})
export class ShowService {
  constructor(private http: HttpClient) {}

  private makeRequest(url: string, params: { [key: string]: any }): Observable<any> {
    let requestUrl = `${BASE_URL}/${url}?api_key=${API_KEY}`;
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        requestUrl += `&${key}=${params[key]}`;
      }
    }
    return this.http.get<any>(requestUrl).pipe(
      map(response => response.data)
    );
  }

  getPremieres(): Observable<any[]> {
    const date = new Date();
    date.setDate(1);
    const params = {
      'first_air_date.gte': date.toISOString().split('T')[0],
      append_to_response: 'genres'
    };
    return this.makeRequest('discover/tv', params).pipe(
      map(data => data.results)
    );
  }

  get(id: number): Observable<any> {
    return this.makeRequest(`tv/${id}`, {});
  }

  getCast(id: number): Observable<any> {
    return this.makeRequest(`tv/${id}/credits`, {});
  }

  search(query: string): Observable<any[]> {
    return this.makeRequest('search/tv', { query }).pipe(
      map(data => data.results)
    );
  }

  getPopular(): Observable<any[]> {
    return this.makeRequest('tv/popular', {}).pipe(
      map(data => data.results)
    );
  }
}
