import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  orderId: number;
  order: Order;
  orders: Order[] = [];

  constructor(private route: ActivatedRoute, private orderSrv: OrderService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.orderId = params['id'];
      this.getOrder(this.orderId);
    })
  }

  getOrder(orderId: number) {
    this.orders = this.orderSrv.getOrders();
    this.order = this.orders.filter((order) => {  return order.OrderId == orderId})[0];
  }
}
