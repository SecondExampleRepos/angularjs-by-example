// Converted from src/sections/popular/popular.ctrl.js

import { Component, OnInit } from '@angular/core';
import { PageValuesService } from '../services/page-values.service';
import { ShowService } from '../services/show.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.tpl-5c215a30f2.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit {
  shows!: any[];

  constructor(private pageValuesService: PageValuesService, private showService: ShowService) {}

  ngOnInit(): void {
    this.pageValuesService.title = "POPULAR";
    this.pageValuesService.description = "The most popular TV shows.";
    this.loadPopularShows();
  }

  private loadPopularShows(): void {
    this.showService.getPopular().then(shows => {
      this.shows = shows;
    });
  }
}
