import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';
import { ProductInterface } from '../shared/productsInterface';

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
  @ViewChild('customLoadingTemplate', {static: false}) customLoadingTemplate: TemplateRef<any>;
  loading = false;
  productDetails: ProductInterface;
  product_id: any

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
    });
  }

  addToCart() {
    this.loading = true;
    const body = {
      product: this.product_id
  }
    this.productService.addToCart(body).subscribe(res => {
      this.loading = false;
      this.presentToast('Product added to cart!')
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
