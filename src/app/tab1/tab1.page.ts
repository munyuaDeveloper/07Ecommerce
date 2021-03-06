import {ProductInterface} from '../shared/productsInterface';
import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ProductService} from '../services/product.service';
import {ToastController} from '@ionic/angular';

import DummyProducts from '../shared/dummyProducts.json'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  products_featured = DummyProducts;
  products: ProductInterface[] = [];
  total_number = 0;
  cartItems = [];
  total_wish_number = 0;
  wishItems = [];

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };

  @ViewChild('customLoadingTemplate', {static: false}) customLoadingTemplate: TemplateRef<any>;
  loading = false;

  constructor(private _productService: ProductService,
              public toastController: ToastController,) {

  }

  ngOnInit() {
    this.getproducts();
  }

  ionViewDidEnter() {
    this.getCartItems();
    this.getWishItems();
  }

  getproducts() {
    this.loading = true;
    this._productService.getProducts().subscribe(res => {
      this.loading = false;
      this.products = res['results'];
    }, err => {
      this.loading = false;
    });
    this.getCartItems();
  }


  getCartItems() {
    this.total_number = 0;
    this._productService.getCartItems('').subscribe(res => {
      if (res['results'] && res['results']['length'] > 0) {
        this.cartItems = res['results'][0]['cart'];
        for (let i = 0; i < this.cartItems.length; i++) {
          this.total_number += this.cartItems[i]['products_num'];
        }
        ;
      }
      ;
    });
  }

  getWishItems() {
    this.total_wish_number = 0;
    this._productService.getWishItems().subscribe(res => {
      this.total_wish_number = res['count'];
    });
  }

  addToCart(id) {
    this.loading = true;
    const body = {
      product: id
    };
    this._productService.addToCart(body).subscribe(res => {
      this.loading = false;
      this.presentToast('Product added to cart!')
      this.getWishItems();
    }, err => {
      this.loading = false;
    });
  }

  addToWishList(id) {
    this.loading = true;
    const body = {
      product: id
    };
    this._productService.addToWishList(body).subscribe(res => {
      this.loading = false;
      this.presentToast('Product added to wishlist!');
      this.getWishItems();
    }, err => {
      this.loading = false;
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
}
