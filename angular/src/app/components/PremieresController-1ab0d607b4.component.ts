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

  getPremieres(): Observable<any[]> {
    const date = new Date();
    date.setDate(1);
    const url = `${BASE_URL}/discover/tv?api_key=${API_KEY}&first_air_date.gte=${date.toISOString().split('T')[0]}&append_to_response=genres`;
    return this.http.get<any>(url).pipe(map(data => data.results));
  }

  get(id: number): Observable<any> {
    const url = `${BASE_URL}/tv/${id}?api_key=${API_KEY}`;
    return this.http.get<any>(url);
  }

  getCast(id: number): Observable<any> {
    const url = `${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}`;
    return this.http.get<any>(url);
  }

  search(query: string): Observable<any[]> {
    const url = `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}`;
    return this.http.get<any>(url).pipe(map(data => data.results));
  }

  getPopular(): Observable<any[]> {
    const url = `${BASE_URL}/tv/popular?api_key=${API_KEY}`;
    return this.http.get<any>(url).pipe(map(data => data.results));
  }
}
