import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User, UsersService } from '@frontend/users';
import { ToastService } from '@frontend/utilities';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { take } from 'rxjs';

@Component({
  selector: 'frontend-users',
  templateUrl: './users.component.html',
  styles: [],
})
export class UsersComponent implements OnInit {
  columns: string[] = ['name', '_id'];
  users: User[] = [];
  dataSource: MatTableDataSource<User> | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  constructor(
    private usersService: UsersService,
    private ngxService: NgxUiLoaderService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this._getAllUsers();
  }

  private _getAllUsers() {
    this.ngxService.start();
    this.usersService
      .getUsers()
      .pipe(take(1))
      .subscribe({
        next: (users) => {
          this.ngxService.stop();
          this.dataSource = new MatTableDataSource(users);
          if (this.paginator && this.sort) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
          this.users = users;
        },
        error: (error: ErrorEvent) => {
          this.toastService.errorToast(error.error.message || 'Server error');
        },
      });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }
}
