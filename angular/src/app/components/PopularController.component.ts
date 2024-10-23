// Converted from src/sections/popular/popular.ctrl.js

import { Component, Input, OnInit } from '@angular/core';
import { PageValues } from '../constants/PageValues';

@Component({
  selector: 'app-popular-controller',
  templateUrl: './popular.tpl.html',
  styleUrls: ['./popular.css']
})
export class PopularControllerComponent implements OnInit {
  @Input() shows!: any[];

  constructor(private pageValues: PageValues) {}

  ngOnInit(): void {
    // Set page title and description
    this.pageValues.title = "POPULAR";
    this.pageValues.description = "The most popular TV shows.";
  }
}
