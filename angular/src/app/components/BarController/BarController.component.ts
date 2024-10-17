// Converted from src/components/bar/bar.ctrl.js

import { Component, OnInit } from '@angular/core';
import { PageValues } from '../../services/page-values.service';

@Component({
  selector: 'app-bar-controller',
  templateUrl: './BarController.component.html',
  styleUrls: ['./BarController.component.css']
})
export class BarControllerComponent implements OnInit {
  data: any;

  constructor(private pageValues: PageValues) {}

  ngOnInit(): void {
    this.data = this.pageValues;
  }
}
