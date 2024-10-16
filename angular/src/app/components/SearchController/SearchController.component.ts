<!-- Converted from src/sections/search/search.ctrl.js -->
<div>
  <h1>{{ pageValues.title }}</h1>
  <p>{{ pageValues.description }}</p>
  <input [(ngModel)]="query" (keyup.enter)="setSearch()" placeholder="Search for shows" />
  <button (click)="setSearch()">Search</button>
  <div *ngIf="loading">Loading...</div>
  <ul>
    <li *ngFor="let show of shows">{{ show.name }}</li>
  </ul>
</div>
