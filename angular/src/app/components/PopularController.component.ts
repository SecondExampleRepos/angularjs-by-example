// Converted from src/sections/popular/popular.ctrl.js

import { Component, Input, OnInit } from '@angular/core';
import { PageValues } from '../../services/page.val';
import { ShowService } from '../../services/show.service';

@Component({
  selector: 'app-popular-controller',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularControllerComponent implements OnInit {
  @Input() shows!: any[];

  constructor(private pageValues: PageValues, private showService: ShowService) {}

  ngOnInit(): void {
    this.pageValues.title = "POPULAR";
    this.pageValues.description = "The most popular TV shows.";
    this.loadShows();
  }

  private loadShows(): void {
    this.showService.getPopularShows().subscribe(shows => {
      this.shows = shows;
    });
  }
}
