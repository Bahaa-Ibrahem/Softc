import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { Router } from '@angular/router';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  
  displayedColumns: string[] = ['OrderId', 'OrderDate', 'UserId', 'PaymentType'];
  dataSource: MatTableDataSource<Order>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private orderSrv: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.orders = this.orderSrv.getOrders();
    this.dataSource = new MatTableDataSource(this.orders);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openOrderDetals(orderId: number) {
    this.router.navigate([`product/product-details/${orderId}`])
  }

}
