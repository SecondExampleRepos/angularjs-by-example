// Converted from src/components/bar/bar.ctrl.js

import { Component, Input } from '@angular/core';
import { PageValues } from '../constants/PageValues';

@Component({
  selector: 'app-bar-controller',
  templateUrl: './bar-controller.component.html',
  styleUrls: ['./bar-controller.component.css']
})
export class BarControllerComponent {
  @Input() data!: typeof PageValues;

  constructor() {
    // Initialize the data with PageValues
    this.data = PageValues;
  }
}
