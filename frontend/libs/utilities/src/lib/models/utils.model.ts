export interface DialogData {
  message?: string;
  id?: string;
}

export interface Success {
  success: boolean;
  message: string;
}

export interface Category {
  _id?: string;
  name: string;
}

export interface Cart {
  name: string;
  category: string;
  quantity: number;
  price: number;
  total: number;
}
