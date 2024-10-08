<!-- show.component.html (converted from src/components/show/show.tpl.html) -->
<div class="show-frame">
  <ul class="genres">
    <li *ngFor="let genre of genres" class="animate-repeat" [ngStyle]="{'background-color': 'rgba(59, 185, 187, ' + genres.length / $index / 5 + ')'}">{{genre.name}}</li>
  </ul>
  <img preload-image default-image="assets/images/loading.jpg" fallback-image="assets/images/fallback.jpg" [src]="'http://image.tmdb.org/t/p/w780/' + show.backdrop_path" />
  <div class="date label label-dark"><span class="icon icon-calendar"></span> {{show.first_air_date | date:'dd-MM-yyyy'}}</div>
  <h2>{{show.original_name | slice:0:40}}</h2>
  <div class="inner">
    <ul class="info">
      <li class="col-xs-6 rating"><span class="icon icon-heart3"></span> {{show.vote_average}}</li>
      <li class="col-xs-6 country"><span class="icon icon-earth"></span> <span *ngFor="let country of show.origin_country">{{country}}{{!$last ? ', ' : ''}}</span> <span *ngIf="show.origin_country.length === 0">--</span></li>
      <div class="clearfix"></div>
    </ul>
    <div class="buttons">
      <a [routerLink]="['/view', show.id]" class="btn btn-info"><span class="icon icon-arrow-right7"></span> View</a>
    </div>
  </div>
</div>
