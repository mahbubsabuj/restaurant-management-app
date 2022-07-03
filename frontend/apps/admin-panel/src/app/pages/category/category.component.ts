import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@frontend/categories';
import { ToastService } from '@frontend/utilities';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { take } from 'rxjs';

@Component({
  selector: 'frontend-category',
  templateUrl: './category.component.html',
  styles: [],
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
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
          this.ngxService.stop();
        },
        error: (error: ErrorEvent) => {
          console.log(error);
        },
      });
  }
}
