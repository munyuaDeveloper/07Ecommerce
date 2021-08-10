import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';
import { ProductInterface } from '../shared/productsInterface';
import DummyProducts from '../shared/dummyProducts.json'


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };
  @ViewChild('customLoadingTemplate', { static: false }) customLoadingTemplate: TemplateRef<any>;
  loading = false;
  productDetails: any;
  product_id: any;
  total_number = 0;
  total_wish_number = 0;
  wishItems = [];
  cartItems = [];

  products_featured = DummyProducts;
  showDummyDetails = false;

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    public toastController: ToastController,) {

  }

  ngOnInit() {
    this.product_id = this.route.snapshot.params.id;
    this.loading = true;
    this.productService.getProductDetail(this.product_id).subscribe(res => {
      this.productDetails = res as ProductInterface;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.products_featured.filter(res => {
        if (res.id == this.product_id) {
          this.showDummyDetails = true;
          this.productDetails = res;
        }
      });

    });

    this.getCartItems();
  }

  getCartItems() {
    this.total_number = 0;
    this.productService.getCartItems().subscribe(res => {
      if (res['results']['length'] > 0) {
        this.cartItems = res['results'][0]['cart'];
        for (let i = 0; i < this.cartItems.length; i++) {
          this.total_number += this.cartItems[i]['products_num'];
        };
      };
    });
  }
  getWishItems() {
    this.total_wish_number = 0;
    this.productService.getWishItems().subscribe(res => {
      if (res['results']['length'] > 0) {
        this.wishItems = res['results'][0]['cart'];
        for (let i = 0; i < this.wishItems.length; i++) {
          this.total_wish_number += this.wishItems[i]['products_num'];
        };
      };
    });
  }

  addToCart() {
    this.loading = true;
    const body = {
      product: this.product_id
    };
    this.productService.addToCart(body).subscribe(res => {
      this.loading = false;
      this.presentToast('Product added to cart!');
      this.getCartItems();
      this.loading = false;
    });
  }
  addToWishList(id) {
    this.loading = true;
    const body = {
      product: id
    };
    this.productService.addToWishList(body).subscribe(res => {
      this.loading = false;
      this.presentToast('Product added to wishlist!');
      this.getCartItems();
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
