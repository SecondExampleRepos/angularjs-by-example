// Converted from src/sections/popular/popular.ctrl.js

import { Component, Input } from '@angular/core';
import { PageValuesService } from '../services/page-values.service';
import { ShowService } from '../services/show.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.tpl-5c215a30f2.html',
  styleUrls: ['./popular.css']
})
export class PopularComponent {
  @Input() shows!: any[];

  constructor(private pageValuesService: PageValuesService, private showService: ShowService) {
    // Set page title and description
    this.pageValuesService.title = "POPULAR";
    this.pageValuesService.description = "The most popular TV shows.";
  }
}
