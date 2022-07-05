import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '@frontend/products';
import { ToastService } from '@frontend/utilities';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { take } from 'rxjs';

@Component({
  selector: 'frontend-products',
  templateUrl: './products.component.html',
  styles: [],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  constructor(
    private productsService: ProductsService,
    private toastService: ToastService,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this._getProducts();
  }

  private _getProducts() {
    this.ngxService.start();
    this.productsService
      .getProducts()
      .pipe(take(1))
      .subscribe({
        next: (products) => {
          this.ngxService.stop();
          this.products = products;
        },
      });
  }
}
