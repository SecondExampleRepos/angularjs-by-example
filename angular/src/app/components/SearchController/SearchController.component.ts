<!-- Converted from src/sections/search/search.tpl.html -->
<div class="search-top">
  <div class="input-group">
    <input type="text" class="form-control input-lg" [(ngModel)]="query" (keydown.enter)="setSearch()">
    <span class="input-group-btn">
      <button class="btn btn-info btn-lg search-btn" type="button" [disabled]="!query" (click)="setSearch()">
        <span class="glyphicon glyphicon-search"></span> Search
      </button>
    </span>
  </div>
</div>
<div class="search-results">
  <div class="no-data" *ngIf="loading === null">Use the search box above to find your favorite TV shows</div>
  <div class="no-data" *ngIf="shows.length === 0 && loading === false">Your search did not return any results</div>
  <div class="throbber" *ngIf="loading"></div>
  <ul class="list-of-shows" *ngIf="loading === false">
    <li class="col-xs-6 col-md-4 repeat-animation" *ngFor="let show of shows">
      <app-show [show]="show"></app-show>
    </li>
  </ul>
</div>
