// Converted from src/sections/popular/popular.ctrl.js

import { Component, OnInit } from '@angular/core';
import { ShowService } from '../services/ShowService-60e6084c07.service';
import { PageValues } from '../services/page.val';

@Component({
  selector: 'app-popular-controller',
  templateUrl: './popular.tpl-5c215a30f2.html',
  styleUrls: ['./popular.component.css']
})
export class PopularControllerComponent implements OnInit {
  shows: any[] = [];

  constructor(private showService: ShowService, private pageValues: PageValues) {}

  ngOnInit(): void {
    this.pageValues.title = "POPULAR";
    this.pageValues.description = "The most popular TV shows.";
    this.loadPopularShows();
  }

  private loadPopularShows(): void {
    this.showService.getPopular().subscribe(response => {
      this.shows = response;
    });
  }
}
