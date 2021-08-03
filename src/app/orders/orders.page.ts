import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalController, ToastController } from '@ionic/angular';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  displayedColumns = ['id', 'name', 'quantity', 'total', 'actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('productPagination', { static: false }) productPagination: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  @ViewChild('customLoadingTemplate', { static: false }) customLoadingTemplate: TemplateRef<any>;
  loading = false;

  constructor(
    private _productService: ProductService,
    public modalController: ModalController,
    public toastController: ToastController) {

  }

  ngOnInit() {
    this.getOrders();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.productPagination;
  }

  getOrders() {
    this.loading = true;
    this._productService.getOrders().subscribe(res => {
      this.loading = false;
      this.dataSource.data = res['results'];

    }, err => {
      this.loading = false;
    });
  }

}
