// Converted from src/sections/popular/popular.ctrl.js

import { Component, Input } from '@angular/core';
import { PageValuesService } from '../services/page-values.service';
import { Show } from '../models/show.model';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.tpl-5c215a30f2.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent {
  @Input() shows!: Show[];

  constructor(private pageValuesService: PageValuesService) {
    // Set page title and description
    this.pageValuesService.title = "POPULAR";
    this.pageValuesService.description = "The most popular TV shows.";
  }
}
