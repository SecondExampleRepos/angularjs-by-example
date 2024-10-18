// Converted from src/sections/premieres/premieres.ctrl.js

import { Component, Input } from '@angular/core';
import { PageValuesService } from '../services/page-values.service';
import { ShowService } from '../services/show.service';

@Component({
  selector: 'app-premieres',
  templateUrl: './premieres.tpl.html',
  styleUrls: ['./premieres.css']
})
export class PremieresComponent {
  @Input() shows!: any[];

  constructor(private pageValuesService: PageValuesService, private showService: ShowService) {
    // Set page title and description
    this.pageValuesService.title = "PREMIERES";
    this.pageValuesService.description = "Brand new shows showing this month.";
  }
}
