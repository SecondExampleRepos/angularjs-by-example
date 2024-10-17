// Converted from src/sections/view/view.ctrl.js

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowService } from '../../services/show.service';
import { PageValuesService } from '../../services/page-values.service';

@Component({
  selector: 'app-view-controller',
  templateUrl: './ViewController.component.html',
  styleUrls: ['./ViewController.component.css']
})
export class ViewControllerComponent implements OnInit {
  show: any = {};
  cast: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private showService: ShowService,
    private pageValues: PageValuesService
  ) {}

  ngOnInit(): void {
    const showId = this.route.snapshot.paramMap.get('id');
    if (showId) {
      this.showService.get(showId).subscribe(show => {
        this.show = show;
        this.pageValues.title = "VIEW";
        this.pageValues.description = `Overview, seasons & info for '${show.original_name}'.`;
        this.loadCast(showId);
      });
    }
  }

  setBannerImage(): { [key: string]: string } {
    return {
      'background': 'url() no-repeat',
      'background-size': '100%',
      'background-position': '100% 0%'
    };
  }

  private loadCast(showId: string): void {
    this.showService.getCast(showId).subscribe(response => {
      this.cast = response.cast;
    });
  }
}
