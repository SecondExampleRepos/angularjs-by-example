// Converted from src/sections/premieres/premieres.ctrl.js

import { Component, Input, OnInit } from '@angular/core';
import { PageValuesService } from '../services/page-values.service';
import { ShowService } from '../services/show.service';

@Component({
  selector: 'app-premieres',
  templateUrl: './premieres.component.html',
  styleUrls: ['./premieres.component.css']
})
export class PremieresComponent implements OnInit {
  @Input() shows!: any[];

  constructor(private pageValuesService: PageValuesService, private showService: ShowService) {}

  ngOnInit(): void {
    this.pageValuesService.title = "PREMIERES";
    this.pageValuesService.description = "Brand new shows showing this month.";
    this.loadShows();
  }

  private loadShows(): void {
    this.showService.getPremieres().then(shows => {
      this.shows = shows;
    });
  }
}
