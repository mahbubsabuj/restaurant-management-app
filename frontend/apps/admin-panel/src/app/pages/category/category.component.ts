import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@frontend/categories';
import { ToastService } from '@frontend/utilities';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { take } from 'rxjs';
import { CategoriesFormComponent } from '../../components/categories-form/categories-form.component';

@Component({
  selector: 'frontend-category',
  templateUrl: './category.component.html',
  styles: [],
})
export class CategoryComponent implements OnInit {
  columns: string[] = ['name', '_id'];
  dataSource: MatTableDataSource<Category> | null = null;
  categories: Category[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  constructor(
    private categoriesService: CategoriesService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ngxService.start();
    this._getCategories();
  }

  private _getCategories() {
    this.categoriesService
      .getCategories()
      .pipe(take(1))
      .subscribe({
        next: (categories) => {
          this.categories = categories;

          console.log(this.categories);
          this.dataSource = new MatTableDataSource(categories);
          if (this.paginator && this.sort) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
          this.ngxService.stop();
        },
        error: (error: ErrorEvent) => {
          this.ngxService.stop();
          console.log(error);
          if (error.error.message) {
            this.toastService.errorToast(error.error.message);
          }
        },
      });
  }
  addCategory() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(CategoriesFormComponent, dialogConfig);
  }
  editCategory(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    dialogConfig.data = {
      id: id,
    };
    this.dialog.open(CategoriesFormComponent, dialogConfig);
  }
  deleteCategory(id: string) {
    //
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
