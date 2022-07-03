import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService, UsersService } from '@frontend/users';
import { ToastService } from '@frontend/utilities';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { take } from 'rxjs';

@Component({
  selector: 'frontend-change-password',
  templateUrl: './change-password.component.html',
  styles: [],
})
export class ChangePasswordComponent implements OnInit {
  id = '';
  changePasswordForm: FormGroup = new FormGroup({
    oldPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });
  constructor(
    private usersService: UsersService,
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private ngxService: NgxUiLoaderService,
    private toastService: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.id = this.authService.getId();
    // const password = this.changePasswordForm.controls['newPassword'].value;
  }
  onFormSubmit() {
    if (!this.isPasswordMatched()) {
      this.toastService.errorToast('New Password and Confirm Password does not match.')
      return;
    }
    this.ngxService.start();
    const password = this.changePasswordForm.controls['newPassword'].value;
    this.usersService.changePassword(this.id, password).pipe(take(1)).subscribe({
      next: (response) => {
        console.log(response);
        this.ngxService.stop();
        this.dialogRef.close();
      },
      error: (error) => {
        console.log(error);
        this.ngxService.stop();
      }
    })
  }
  isPasswordMatched() {
    return (
      this.changePasswordForm.controls['newPassword'].value ===
      this.changePasswordForm.controls['confirmPassword'].value
    );
  }
}
