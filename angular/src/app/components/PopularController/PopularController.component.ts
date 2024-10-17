// Converted from src/sections/popular/popular.ctrl.js

import { Component, OnInit } from '@angular/core';
import { ShowService } from '../../services/show.service';
import { PageValuesService } from '../../services/page-values.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit {
  shows: any[] = [];

  constructor(private showService: ShowService, private pageValues: PageValuesService) {}

  ngOnInit(): void {
    this.pageValues.title = "POPULAR";
    this.pageValues.description = "The most popular TV shows.";
    this.loadShows();
  }

  private loadShows(): void {
    this.showService.getPopular().then(shows => {
      this.shows = shows;
    });
  }
}
