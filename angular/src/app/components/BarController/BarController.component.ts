// src/app/services/page-values.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageValuesService {
  private pageValues = {
    title: null,
    description: null,
    loading: false
  };

  getPageValues() {
    return this.pageValues;
  }
}
