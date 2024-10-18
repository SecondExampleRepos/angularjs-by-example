// Converted from src/sections/view/view.ctrl.js

import { Component, Input, OnInit } from '@angular/core';
import { ShowService } from '../services/ShowService-60e6084c07.service';
import { PageValues } from '../services/page.val';

@Component({
  selector: 'app-view-controller',
  templateUrl: './ViewController-c9b238673f.component.html',
  styleUrls: ['./ViewController-c9b238673f.component.css']
})
export class ViewControllerComponent implements OnInit {
  @Input() show!: any;
  cast: any[] = [];

  constructor(private showService: ShowService, private pageValues: PageValues) {}

  ngOnInit(): void {
    this.pageValues.title = "VIEW";
    this.pageValues.description = `Overview, seasons & info for '${this.show.original_name}'.`;
    this.loadCast();
  }

  setBannerImage() {
    return {
      'background': 'url() no-repeat',
      'background-size': '100%',
      'background-position': '100% 0%'
    };
  }

  private loadCast(): void {
    this.showService.getCast(this.show.id).subscribe(response => {
      this.cast = response.cast;
    });
  }
}
