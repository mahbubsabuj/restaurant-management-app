import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriesService, Category } from '@frontend/categories';
import { DialogData, ToastService } from '@frontend/utilities';
import { take } from 'rxjs';

@Component({
  selector: 'frontend-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [],
})
export class CategoriesFormComponent implements OnInit {
  categoryForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  isEditingMode = false;
  id = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private categoriesService: CategoriesService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this._checkIsEditingMode();
  }
  onFormSubmit() {
    if (this.isEditingMode) {
      this._updateCategory();
    } else {
      this._addCategory();
    }
  }
  private _addCategory() {
    const category: Category = {
      name: this.categoryForm.controls['name'].value,
    };
    this.categoriesService
      .addCategory(category)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.toastService.successToast('Category added successfully');
        },
        error: (error: ErrorEvent) => {
          if (error.error.message) {
            this.toastService.errorToast(error.error.message);
          } else {
            this.toastService.errorToast('Category could not be added');
          }
        },
      });
  }

  private _updateCategory() {
    const category: Category = {
      name: this.categoryForm.controls['name'].value,
    };
    this.categoriesService
      .updateCategory(this.id, category)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.toastService.successToast('Category updated successfully');
        },
        error: (error: ErrorEvent) => {
          if (error.error.message) {
            this.toastService.errorToast(error.error.message);
          } else {
            this.toastService.errorToast('Category could not be updated');
          }
        },
      });
  }

  private _checkIsEditingMode() {
    if (this.data.id) {
      this.isEditingMode = true;
      this.id = this.data.id;
      this.categoriesService
        .getCategory(this.id)
        .pipe(take(1))
        .subscribe({
          next: (category) => {
            this.categoryForm.controls['name'].setValue(category.name);
          },
        });
    }
  }
}
