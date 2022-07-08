import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Bill, BillsService } from '@frontend/bills';
import { ToastService } from '@frontend/utilities';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { take } from 'rxjs';

@Component({
  selector: 'frontend-bills',
  templateUrl: './bills.component.html',
  styles: [],
})
export class BillsComponent implements OnInit {
  bills: Bill[] = [];
  columns: string[] = [
    'name',
    'email',
    'phoneNumber',
    'paymentMethod',
    'total',
    'actions',
  ];
  dataSource: MatTableDataSource<Bill> | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  constructor(
    private billsService: BillsService,
    private toastService: ToastService,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this._getBills();
  }

  deleteBill(id: string) {
    this.billsService
      .deleteBill(id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.toastService.successToast('Bill deleted successfully');
          this._getBills();
        },
        error: () => {
          this.toastService.errorToast('Bill could not be deleted');
        },
      });
  }

  viewBill(id: string) {
    //
  }

  getPDF(id: string) {
    //
  }

  private _getBills() {
    this.ngxService.start();
    this.billsService
      .getBills()
      .pipe(take(1))
      .subscribe({
        next: (bills) => {
          this.ngxService.stop();
          this.bills = bills;
          this.dataSource = new MatTableDataSource(this.bills);
          if (this.paginator && this.sort) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        },
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }
}
