// Converted from src/sections/popular/popular.ctrl.js

import { Component, Input, OnInit } from '@angular/core';
import { ShowService } from '../services/show.service';
import { PageValuesService } from '../services/page-values.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.tpl-5c215a30f2.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit {
  @Input() shows!: any[];

  constructor(private showService: ShowService, private pageValuesService: PageValuesService) {}

  ngOnInit(): void {
    this.pageValuesService.title = "POPULAR";
    this.pageValuesService.description = "The most popular TV shows.";
    this.loadPopularShows();
  }

  private loadPopularShows(): void {
    this.showService.getPopular().subscribe(shows => {
      this.shows = shows;
    });
  }
}
