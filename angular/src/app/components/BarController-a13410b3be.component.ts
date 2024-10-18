// Converted from src/components/bar/bar.ctrl.js

import { Component, Input } from '@angular/core';
import { PageValues } from '../../services/page-values.service';

@Component({
  selector: 'app-bar-controller',
  templateUrl: './BarController-a13410b3be.component.html',
  styleUrls: ['./BarController-a13410b3be.component.css']
})
export class BarControllerComponent {
  @Input() data!: PageValues;

  constructor() {}
}
