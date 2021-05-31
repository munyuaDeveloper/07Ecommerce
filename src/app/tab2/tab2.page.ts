import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {ProductService} from '../services/product.service';
import {ProductInterface} from '../shared/productsInterface';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  products: ProductInterface[] = []
  total_number = 0

  cartItems = [];
  categories = []

  @ViewChild('customLoadingTemplate', {static: false}) customLoadingTemplate: TemplateRef<any>;
  loading = false;

  constructor(private _productService: ProductService,
              public toastController: ToastController,) {

  }

  getCategory() {
    this._productService.getCategory().subscribe(res => {
      this.categories = res['results'];
    })
  }

  ngOnInit() {
    this.loading = true;
    this._productService.getProducts().subscribe(res => {
      this.loading = false;
      this.products = res['results']
    }, err => {
      this.loading = false;
    })

    this.getCategory();

    this.getCartItems();
  }

  getCategoryProducts(id) {
    this.loading = true;
    this._productService.getProductsByCategory(id).subscribe(res => {
      this.loading = false;
      this.products = res['results'][0]['products']
    }, err => {
      this.loading = false;
    })
  }

  getCartItems() {
    this._productService.getCartItems().subscribe(res => {
      if (res['results']['length'] > 0) {
        this.cartItems = res['results'][0]['cart'];
        for (let i = 0; i < this.cartItems.length; i++) {
          this.total_number += this.cartItems[i]['products_num'];
        }
      }
    })
  }

  addToCart(id) {
    this.loading = true;
    const body = {
      product: id
    }
    this._productService.addToCart(body).subscribe(res => {
      this.loading = false;
      this.presentToast('Product added to cart!')
      this.getCartItems();
    }, err => {
      this.loading = false;
    })
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }
}
