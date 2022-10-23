import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface IProduct {
  ProductId: number;
  ProductName: string;
  ProductPrice: number;
  AvailablePieces: number;
  ProductImg: string;
}



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  products: IProduct[] = [{"ProductId":123,"ProductName":"Product 1","ProductPrice":123.5,"AvailablePieces":25,"ProductImg":"https:\/\/www.decolore.net\/wp-content\/uploads\/2017\/04\/product-mock-up-set-2.jpg"},{"ProductId":124,"ProductName":"Product 2","ProductPrice":100,"AvailablePieces":100,"ProductImg":"https:\/\/www.decolore.net\/wp-content\/uploads\/2017\/04\/product-mock-up-set-2.jpg"},{"ProductId":125,"ProductName":"Product 3","ProductPrice":250.5,"AvailablePieces":10,"ProductImg":"https:\/\/www.decolore.net\/wp-content\/uploads\/2017\/04\/product-mock-up-set-2.jpg"},{"ProductId":126,"ProductName":"Product 4","ProductPrice":124.9,"AvailablePieces":60,"ProductImg":"https:\/\/www.decolore.net\/wp-content\/uploads\/2017\/04\/product-mock-up-set-2.jpg"},{"ProductId":127,"ProductName":"Product 5","ProductPrice":253.2,"AvailablePieces":400,"ProductImg":"https:\/\/cdn.shopify.com\/s\/files\/1\/1038\/1798\/products\/Long-Tin-Can-Mock-Up-1-Free-by-MassDream_1024x1024.jpg?v=1529072551"},{"ProductId":128,"ProductName":"Product 6","ProductPrice":589.5,"AvailablePieces":20,"ProductImg":"https:\/\/www.decolore.net\/wp-content\/uploads\/2017\/04\/product-mock-up-set-2.jpg"},{"ProductId":129,"ProductName":"Product 7","ProductPrice":20.2,"AvailablePieces":1200,"ProductImg":"https:\/\/cdn.shopify.com\/s\/files\/1\/1038\/1798\/products\/Long-Tin-Can-Mock-Up-1-Free-by-MassDream_1024x1024.jpg?v=1529072551"},{"ProductId":130,"ProductName":"Product 8","ProductPrice":30.5,"AvailablePieces":30,"ProductImg":"https:\/\/www.decolore.net\/wp-content\/uploads\/2017\/04\/product-mock-up-set-2.jpg"},{"ProductId":131,"ProductName":"Product 9","ProductPrice":5.5,"AvailablePieces":5220,"ProductImg":"https:\/\/cdn.shopify.com\/s\/files\/1\/1038\/1798\/products\/Long-Tin-Can-Mock-Up-1-Free-by-MassDream_1024x1024.jpg?v=1529072551"},{"ProductId":132,"ProductName":"Product 10","ProductPrice":20.5,"AvailablePieces":1000,"ProductImg":"https:\/\/www.decolore.net\/wp-content\/uploads\/2017\/04\/product-mock-up-set-2.jpg"},{"ProductId":133,"ProductName":"Product 11","ProductPrice":4.5,"AvailablePieces":24,"ProductImg":"https:\/\/cdn.shopify.com\/s\/files\/1\/1038\/1798\/products\/Long-Tin-Can-Mock-Up-1-Free-by-MassDream_1024x1024.jpg?v=1529072551"},{"ProductId":134,"ProductName":"Product 12","ProductPrice":20,"AvailablePieces":5,"ProductImg":"https:\/\/www.decolore.net\/wp-content\/uploads\/2017\/04\/product-mock-up-set-2.jpg"},{"ProductId":135,"ProductName":"Product 13","ProductPrice":25.2,"AvailablePieces":4,"ProductImg":"https:\/\/cdn.shopify.com\/s\/files\/1\/1038\/1798\/products\/Long-Tin-Can-Mock-Up-1-Free-by-MassDream_1024x1024.jpg?v=1529072551"},{"ProductId":136,"ProductName":"Product 14","ProductPrice":200,"AvailablePieces":2,"ProductImg":"https:\/\/www.decolore.net\/wp-content\/uploads\/2017\/04\/product-mock-up-set-2.jpg"},{"ProductId":137,"ProductName":"Product 15","ProductPrice":30,"AvailablePieces":1,"ProductImg":"https:\/\/cdn.shopify.com\/s\/files\/1\/1038\/1798\/products\/Long-Tin-Can-Mock-Up-1-Free-by-MassDream_1024x1024.jpg?v=1529072551"},{"ProductId":138,"ProductName":"Product 16","ProductPrice":10,"AvailablePieces":1,"ProductImg":"https:\/\/www.decolore.net\/wp-content\/uploads\/2017\/04\/product-mock-up-set-2.jpg"},{"ProductId":139,"ProductName":"Product 17","ProductPrice":30.5,"AvailablePieces":2,"ProductImg":"https:\/\/cdn.shopify.com\/s\/files\/1\/1038\/1798\/products\/Long-Tin-Can-Mock-Up-1-Free-by-MassDream_1024x1024.jpg?v=1529072551"},{"ProductId":140,"ProductName":"Product 18","ProductPrice":63.5,"AvailablePieces":3,"ProductImg":"https:\/\/www.decolore.net\/wp-content\/uploads\/2017\/04\/product-mock-up-set-2.jpg"},{"ProductId":141,"ProductName":"Product 19","ProductPrice":60,"AvailablePieces":0,"ProductImg":"https:\/\/cdn.shopify.com\/s\/files\/1\/1038\/1798\/products\/Long-Tin-Can-Mock-Up-1-Free-by-MassDream_1024x1024.jpg?v=1529072551"},{"ProductId":142,"ProductName":"Product 20","ProductPrice":59.5,"AvailablePieces":0,"ProductImg":"https:\/\/www.decolore.net\/wp-content\/uploads\/2017\/04\/product-mock-up-set-2.jpg"}];

  displayedColumns: string[] = ['ProductId', 'ProductName', 'ProductPrice', 'AvailablePieces', 'ProductImg'];
  dataSource: MatTableDataSource<IProduct>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {

    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
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

}
