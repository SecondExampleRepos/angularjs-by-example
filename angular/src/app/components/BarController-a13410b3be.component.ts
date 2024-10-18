// Converted from src/components/bar/bar.ctrl.js

import { Component, Input } from '@angular/core';
import { PageValuesService } from '../services/page-values.service';

@Component({
  selector: 'app-bar-controller',
  templateUrl: './BarController-a13410b3be.component.html',
  styleUrls: ['./BarController-a13410b3be.component.css']
})
export class BarControllerComponent {
  @Input() data!: any;

  constructor(private pageValuesService: PageValuesService) {
    this.data = this.pageValuesService.getPageValues();
  }
}
