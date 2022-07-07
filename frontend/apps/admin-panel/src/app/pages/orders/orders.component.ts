import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BillsService } from '@frontend/bills';
import { Cart, ToastService } from '@frontend/utilities';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'frontend-orders',
  templateUrl: './orders.component.html',
  styles: [],
})
export class OrdersComponent {
  cartItems: Cart[] = [];
  billsForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    contactNumber: new FormControl('', Validators.required),
    paymentMethod: new FormControl('', Validators.required),
  });
  constructor(
    private billsService: BillsService,
    private toastService: ToastService,
    private ngxService: NgxUiLoaderService
  ) {}
  onFormSubmit() {
    if (this.cartItems.length === 0) {
      this.toastService.errorToast('Cart is Empty');
      return;
    }
  }
  setQuantity(quantity: number) {
    //
  }
  
  addToCart(cartItem: Cart) {
    let isPresent = false;
    this.cartItems.map((item) => {
      if (item.name === cartItem.name) {
        item.quantity += cartItem.quantity;
        isPresent = true;
      }
    });
    if (!isPresent) {
      this.cartItems.push(cartItem);
    }
  }
}
