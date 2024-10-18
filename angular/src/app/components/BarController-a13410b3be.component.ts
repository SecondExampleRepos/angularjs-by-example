// Converted from src/components/bar/bar.ctrl.js

import { Component, Input } from '@angular/core';
import { PageValuesService } from '../services/page-values.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent {
  @Input() data!: { title: string | null; description: string | null; loading: boolean };

  constructor(private pageValuesService: PageValuesService) {
    this.data = this.pageValuesService.getPageValues();
  }
}
