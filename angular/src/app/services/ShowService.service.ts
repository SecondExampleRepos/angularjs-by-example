// Converted from src/services/show.fct.js

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ShowService {
  private readonly API_KEY = '87de9079e74c828116acce677f6f255b';
  private readonly BASE_URL = 'http://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  private makeRequest(url: string, params: any): Observable<any> {
    let requestUrl = `${this.BASE_URL}/${url}?api_key=${this.API_KEY}`;
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        requestUrl += `&${key}=${params[key]}`;
      }
    }
    return this.http.get(requestUrl, {
      headers: { 'Content-Type': 'application/json' },
      observe: 'body',
      responseType: 'json'
    }).pipe(
      map(response => response),
      catchError(this.dataServiceError)
    );
  }

  getPremieres(): Observable<any> {
    const date = new Date();
    date.setDate(1);
    return this.makeRequest('discover/tv', {
      'first_air_date.gte': moment(date).format('DD-MM-YYYY'),
      append_to_response: 'genres'
    }).pipe(
      map(data => data.results)
    );
  }

  get(id: string): Observable<any> {
    return this.makeRequest(`tv/${id}`, {});
  }

  getCast(id: string): Observable<any> {
    return this.makeRequest(`tv/${id}/credits`, {});
  }

  search(query: string): Observable<any> {
    return this.makeRequest('search/tv', { query }).pipe(
      map(data => data.results)
    );
  }

  getPopular(): Observable<any> {
    return this.makeRequest('tv/popular', {}).pipe(
      map(data => data.results)
    );
  }

  private dataServiceError(errorResponse: any): Observable<never> {
    console.error('XHR Failed for ShowService');
    console.error(errorResponse);
    throw errorResponse;
  }
}
