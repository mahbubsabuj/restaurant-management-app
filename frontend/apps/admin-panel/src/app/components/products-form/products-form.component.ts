import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriesService } from '@frontend/categories';
import { ProductsService } from '@frontend/products';
import { Category, DialogData, ToastService } from '@frontend/utilities';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { take } from 'rxjs';

@Component({
  selector: 'frontend-products-form',
  templateUrl: './products-form.component.html',
  styles: [],
})
export class ProductsFormComponent implements OnInit {
  isEditingMode = false;
  id = '';
  categories: Category[] = [];
  productForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    status: new FormControl(false),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private ngxService: NgxUiLoaderService,
    private toastService: ToastService,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private dialogRef: MatDialogRef<ProductsFormComponent>
  ) {}
  ngOnInit(): void {
    this._checkEditingMode();
  }

  onFormSubmit() {
    //
  }

  private _checkEditingMode() {
    if (this.data.id) {
      this.isEditingMode = true;
      this.id = this.data.id;
      this._getProduct();
    }
  }
  private _getProduct() {
    this.ngxService.start();
    this.productsService
      .getProduct(this.id)
      .pipe(take(1))
      .subscribe({
        next: (product) => {
          this._getCategories();
          this.productForm.controls['name'].setValue(product.name);
          this.productForm.controls['categoryId'].setValue(
            product.category?._id
          );
          this.productForm.controls['price'].setValue(product.price);
          this.productForm.controls['description'].setValue(
            product.description
          );
          this.productForm.controls['status'].setValue(product.status);
        },
        error: (error: ErrorEvent) => {
          this.ngxService.stop();
          if (error.error.message) {
            this.toastService.errorToast(error.error.message);
          } else {
            this.toastService.errorToast('Error in the server');
          }
        },
      });
  }
  private _getCategories() {
    this.categoriesService
      .getCategories()
      .pipe(take(1))
      .subscribe({
        next: (categories) => {
          this.categories = categories;
          this.ngxService.stop();
        },
      });
  }
}
