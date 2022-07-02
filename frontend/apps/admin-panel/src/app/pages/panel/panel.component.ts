import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'frontend-panel',
  templateUrl: './panel.component.html',
  styles: [],
})
export class PanelComponent {
  constructor(private router: Router) {}
  handleNavigation() {
    this.router.navigateByUrl('category');
  }
}
