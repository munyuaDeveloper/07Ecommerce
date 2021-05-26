import { ProductInterface } from '../shared/productsInterface';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  products: ProductInterface[] = [

  ]

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };

  @ViewChild('customLoadingTemplate', {static: false}) customLoadingTemplate: TemplateRef<any>;
  loading = true;
  constructor(private _productService: ProductService) {

  }

ngOnInit() {
  this.loading = true;
  this._productService.getProducts().subscribe(res => {
    this.loading = false;
    this.products = res['results']
  }, err => {
    this.loading = false;
  })
}

}
