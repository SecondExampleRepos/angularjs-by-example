// Converted from src/sections/premieres/premieres.ctrl.js

import { Component, Input } from '@angular/core';
import { ShowService } from '../services/ShowService.service';

@Component({
  selector: 'app-premieres-controller',
  templateUrl: './premieres-controller.component.html',
  styleUrls: ['./premieres-controller.component.css']
})
export class PremieresControllerComponent {
  @Input() shows!: any[];

  constructor(private pageValues: PageValuesService, private showService: ShowService) {
    // Set page title and description
    this.pageValues.title = "PREMIERES";
    this.pageValues.description = "Brand new shows showing this month.";

    // Initialize shows
    this.showService.getPremieres().then(shows => {
      this.shows = shows;
    });
  }
}
