export interface Cart {
  name: string;
  category: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Bill {
  name: string;
  email: string;
  phoneNumber: string;
  uuid: string;
  paymentMethod: string;
  productDetails: Cart[];
  createdBy: string;
}
