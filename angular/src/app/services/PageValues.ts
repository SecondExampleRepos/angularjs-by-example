// Converted from src/services/page.val.js

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageValuesService {
  title: string | null = null;
  description: string | null = null;
  loading: boolean = false;
}