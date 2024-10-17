// Converted from src/sections/premieres/premieres.ctrl.js

import { Component, OnInit } from '@angular/core';
import { ShowService } from '../../services/show.service';
import { PageValuesService } from '../../services/page-values.service';

@Component({
  selector: 'app-premieres',
  templateUrl: './premieres.component.html',
  styleUrls: ['./premieres.component.css']
})
export class PremieresComponent implements OnInit {
  shows: any[] = [];

  constructor(private showService: ShowService, private pageValues: PageValuesService) {}

  ngOnInit(): void {
    this.pageValues.title = "PREMIERES";
    this.pageValues.description = "Brand new shows showing this month.";
    this.loadShows();
  }

  private loadShows(): void {
    this.showService.getPremieres().then(shows => {
      this.shows = shows;
    });
  }
}
