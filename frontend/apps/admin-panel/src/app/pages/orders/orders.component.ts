import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Bill, BillsService } from '@frontend/bills';
import { CategoriesService } from '@frontend/categories';
import { Product, ProductsService } from '@frontend/products';
import { Cart, Category, ToastService } from '@frontend/utilities';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { take } from 'rxjs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'frontend-orders',
  templateUrl: './orders.component.html',
  styles: [],
})
export class OrdersComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  cartItems: Cart[] = [];
  paymentMethods: string[] = ['Cash', 'Debit Card', 'Credit Card'];
  userId = '';
  orderForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    contactNumber: new FormControl('', Validators.required),
    paymentMethod: new FormControl('', Validators.required),
    product: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    quantity: new FormControl({ value: '', disabled: true }, Validators.required),
    price: new FormControl({ value: '', disabled: true }, Validators.required),
    total: new FormControl({ value: 0, disabled: true }, Validators.required),
  });
  constructor(
    private billsService: BillsService,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private toastService: ToastService,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this._getCategories();
  }

  onFormSubmit() {
    const bill: Bill = {
      name: this.orderForm.controls['name'].value,
      email: this.orderForm.controls['email'].value,
      paymentMethod: this.orderForm.controls['paymentMethod'].value,
      phoneNumber: this.orderForm.controls['phoneNumber'].value,
      productDetails: JSON.stringify(this.cartItems),
      createdBy: this.userId,
    };
    console.log(bill);
  }
  setQuantity() {
    const price = this.orderForm.controls['price'].value;
    const quantity = this.orderForm.controls['quantity'].value;
    this.orderForm.controls['total'].setValue(price * quantity);
    console.log()
  }

  addToCart(cartItem: Cart) {
    let isPresent = false;
    this.cartItems.map((item) => {
      if (item.name === cartItem.name) {
        item.quantity += cartItem.quantity;
        isPresent = true;
        this.toastService.successToast('Product quantity updated successfully');
      }
    });
    if (!isPresent) {
      this.toastService.successToast('Product added successfully');
      this.cartItems.push(cartItem);
    }
  }

  deleteFromCart(name: string) {
    this.cartItems = this.cartItems.filter((item) => {
      return item.name !== name;
    });
  }

  setCartItem(product: Product) {
    this.orderForm.controls['product'].setValue(product._id);
    this.orderForm.controls['quantity'].setValue(1);
    this.orderForm.controls['quantity'].enable();
    this.orderForm.controls['price'].setValue(product.price);
    this.orderForm.controls['total'].setValue(product.price);
  }

  getProductByCategory(id: string) {
    this.productsService
      .getPorductsByCategory(id)
      .pipe(take(1))
      .subscribe({
        next: (products) => {
          this.products = products;
          this.orderForm.controls['quantity'].setValue('');
          this.orderForm.controls['price'].setValue('');
          this.orderForm.controls['total'].setValue(0);
        },
      });
  }

  downloadPDF(uuid: string) {
    const data = { uuid: uuid };
  }

  private _getCategories() {
    this.ngxService.start();
    this.categoriesService
      .getCategories()
      .pipe(take(1))
      .subscribe({
        next: (categories) => {
          this.ngxService.stop();
          this.categories = categories;
        },
      });
  }
}
