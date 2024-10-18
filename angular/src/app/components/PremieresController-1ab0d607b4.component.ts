// Converted from src/sections/premieres/premieres.ctrl.js

import { Component, Input } from '@angular/core';
import { PageValuesService } from '../services/page-values.service';
import { Show } from '../models/show.model';

@Component({
  selector: 'app-premieres',
  templateUrl: './premieres.tpl.html',
  styleUrls: ['./premieres.component.css']
})
export class PremieresComponent {
  @Input() shows!: Show[];

  constructor(private pageValuesService: PageValuesService) {
    // Set page title and description
    this.pageValuesService.title = "PREMIERES";
    this.pageValuesService.description = "Brand new shows showing this month.";
  }
}
