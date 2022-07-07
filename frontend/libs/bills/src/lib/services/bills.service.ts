import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill.model';

@Injectable({
  providedIn: 'root',
})
export class BillsService {
  constructor(private httpClient: HttpClient) {}

  getBills(): Observable<Bill> {
    return this.httpClient.get<Bill>(`${environment.apiURL}/bills`);
  }

  deleteBill(id: string): Observable<unknown> {
    return this.httpClient.delete<unknown>(`${environment.apiURL}/bills/${id}`);
  }
}
