import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productId: number;
  product: Product;
  products: Product[] = [];

  constructor(private route: ActivatedRoute, private productSrv: ProductsService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.productId = params['id'];
      this.getProduct(this.productId);
    })
  }

  getProduct(productId: number) {
    this.products = this.productSrv.getProducts();
    console.log(this.products)
    this.product = this.products.filter((prosuct) => {  return prosuct.ProductId == productId})[0];
    console.log(this.product)
  }

}
