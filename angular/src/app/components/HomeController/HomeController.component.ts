// HomeController.component.ts

import { Component, OnInit } from '@angular/core';
import { ShowService } from '../../services/ShowService.service';
import { PageValues } from '../../services/PageValues';

@Component({
  selector: 'app-home-controller',
  templateUrl: './HomeController.component.html',
  styleUrls: ['./HomeController.component.css']
})
export class HomeControllerComponent implements OnInit {
  shows: any[] = [];
  pageValues: PageValues;

  constructor(private showService: ShowService) {
    this.pageValues = new PageValues();
  }

  ngOnInit(): void {
    this.loadShows();
  }

  loadShows(): void {
    this.showService.getShows().subscribe((data: any) => {
      this.shows = data;
    });
  }
}
