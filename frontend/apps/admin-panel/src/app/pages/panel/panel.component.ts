import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '@frontend/users';
import { ConfirmationComponent } from '../../components/confirmation/confirmation.component';

@Component({
  selector: 'frontend-panel',
  templateUrl: './panel.component.html',
  styles: [],
})
export class PanelComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}
  handleNavigation() {
    this.router.navigateByUrl('category');
  }
  logOut() {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: { message: 'Logout' },
    });
    dialogRef.componentInstance.EmitStatusChange.subscribe(() => {
      dialogRef.close();
      this.authService.logOut();
      this.router.navigateByUrl('/');
    });
  }

  changePassword() {
    //
  }
}
