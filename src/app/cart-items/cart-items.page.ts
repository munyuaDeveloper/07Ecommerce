import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalController, ToastController } from '@ionic/angular';
import { ProductService } from '../services/product.service';
import { CartDetails } from './interface';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.page.html',
  styleUrls: ['./cart-items.page.scss'],
})
export class CartItemsPage implements OnInit {
  displayedColumns = ['id', 'name', 'quantity', 'total', 'actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('productPagination', { static: false }) productPagination: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  @ViewChild('customLoadingTemplate', { static: false }) customLoadingTemplate: TemplateRef<any>;
  loading = false;

  amount_payable = 0;

  cartDetail: CartDetails;

  constructor(
    private _productService: ProductService,
    public modalController: ModalController,
    public toastController: ToastController) {

  }

  ngOnInit() {
    this.getCartItems('');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.productPagination;
  }

  getCartItems(search) {
    this.amount_payable = 0;
    this.loading = true;
    this._productService.getCartItems(search).subscribe(res => {
      this.cartDetail = res as CartDetails;
      this.loading = false;
      this.dataSource.data = [];
      if (res['results']['length'] > 0) {
        this.dataSource.data = res['results'][0]['cart'];
        for (let i = 0; i < this.dataSource.data.length; i++) {
          this.amount_payable += this.dataSource.data[i]['total'];
        }

      }

    }, err => {
      this.loading = false;
    });
  }

  deleteCartItem(id) {
    const body = {
      request_id: id
    };

    this._productService.deleteCart(body).subscribe(res => {
      this.presentToast('Item removed!');
      this.getCartItems('');
    });
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.getCartItems(filterValue.trim().toLowerCase())
  }
}
