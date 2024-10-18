// Converted from src/sections/premieres/premieres.ctrl.js

import { Component, OnInit } from '@angular/core';
import { ShowService } from '../services/ShowService-60e6084c07.service';
import { PageValues } from '../services/page.val';

@Component({
  selector: 'app-premieres',
  templateUrl: './premieres.tpl-046852b5e9.html',
  styleUrls: ['./premieres.component.css']
})
export class PremieresComponent implements OnInit {
  shows: any[] = [];

  constructor(private showService: ShowService, private pageValues: PageValues) {}

  ngOnInit(): void {
    this.pageValues.title = "PREMIERES";
    this.pageValues.description = "Brand new shows showing this month.";
    this.loadPremieres();
  }

  private loadPremieres(): void {
    this.showService.getPremieres().subscribe((shows: any[]) => {
      this.shows = shows;
    });
  }
}
