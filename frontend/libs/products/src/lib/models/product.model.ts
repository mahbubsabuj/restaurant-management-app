import { Category } from '@frontend/utilities';

export interface Product {
  name: string;
  category: Category;
  description: string;
  price: number;
  status: boolean;
}
