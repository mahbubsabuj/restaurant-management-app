import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../../components/login/login.component';
import { SignupComponent } from '../../components/signup/signup.component';

@Component({
  selector: 'frontend-home-page',
  templateUrl: './home-page.component.html',
  styles: [],
})
export class HomePageComponent {
  constructor(private dialog: MatDialog) {}
  handleSignUpAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '650px';
    this.dialog.open(SignupComponent);
  }
  handleLoginAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '650px';
    this.dialog.open(LoginComponent);
  }
}
