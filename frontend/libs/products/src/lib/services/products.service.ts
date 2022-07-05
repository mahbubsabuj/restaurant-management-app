import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Success } from '@frontend/utilities';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${environment.apiURL}/products`);
  }

  getPorductsByCategory(id: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      `${environment.apiURL}/products/category/${id}`
    );
  }

  getProduct(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${environment.apiURL}/products/${id}`);
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.httpClient.put<Product>(
      `${environment.apiURL}/products/${id}`,
      product
    );
  }

  updateProductStatus(id: string, status: boolean): Observable<Success> {
    return this.httpClient.put<Success>(
      `${environment.apiURL}/products/updateStatus/${id}`,
      { status }
    );
  }

  addProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(
      `${environment.apiURL}/products`,
      product
    );
  }

  deleteProduct(id: string): Observable<Success> {
    return this.httpClient.delete<Success>(
      `${environment.apiURL}/products/${id}`
    );
  }
}
