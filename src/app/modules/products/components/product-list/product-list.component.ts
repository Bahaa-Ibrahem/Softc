import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';




@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  products: Product[] = [];

  displayedColumns: string[] = ['ProductId', 'ProductName', 'ProductPrice', 'AvailablePieces', 'ProductImg'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productSrv: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.products = this.productSrv.getProducts();
    this.dataSource = new MatTableDataSource(this.products);
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

  openProductDetals(productId: number) {
    this.router.navigate([`product/product-details/${productId}`])
  }

}
