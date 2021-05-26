import { Component, ViewChild } from '@angular/core';
import { ProductInterface } from '../shared/productsInterface';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  products: ProductInterface[] = [
    
  ]


  constructor() {
  }
}
