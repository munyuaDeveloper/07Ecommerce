import { ProductInterface } from '../shared/productsInterface';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  products: ProductInterface[] = []
  total_number = 0

  cartItems = [];
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
  this.getCartItems();
}
getproducts() {
  this.loading = true;  
  this._productService.getProducts().subscribe(res => {
    this.loading = false;
    this.products = res['results']
  }, err => {
    this.loading = false;
  })
}


getCartItems(){
  this.total_number = 0
  this._productService.getCartItems().subscribe(res => {

    if(res['results']['length']> 0) {
      this.cartItems = res['results'][0]['cart'];
      for(let i = 0; i< this.cartItems.length; i++){
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
