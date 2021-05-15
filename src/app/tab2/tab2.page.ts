import { Component, ViewChild } from '@angular/core';
import { ProductInterface } from '../shared/productsInterface';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  products: ProductInterface[] = [
    {
      title: 'Product one',
      overview: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      price: '64',
      category: 'Clothes',
      image: 'https://cdn.cnn.com/cnnnext/dam/assets/200302101200-underscored-ecoshoes-allbirds-runners.jpg'
    },
    {
      title: 'Product Two',
      overview: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      price: '25',
      category: 'Clothes',
      image: 'https://images.squarespace-cdn.com/content/v1/5442b6cce4b0cf00d1a3bef2/1617994517472-JHJRHEI85WBTG5G6B4BY/ke17ZwdGBToddI8pDm48kIgDQUuZGudwlQpLCqyQEt8UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8PaoYXhp6HxIwZIk7-Mi3Tsic-L2IOPH3Dwrhl-Ne3Z2kDbnkgg-pjfVtIexCHLh42QYBHVOhwoS7bw-rX645trdZR9z9mxWb0yLUToVqwSd/ethical-shoe-brands-for-every-occasion-allbirds'
    },
    {
      title: 'Product Three',
      overview: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      price: '50',
      category: 'Clothes',
      image: 'https://cdn.cnn.com/cnnnext/dam/assets/200302101200-underscored-ecoshoes-allbirds-runners.jpg'
    },
    {
      title: 'Product Four',
      overview: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      price: '20',
      category: 'Clothes',
      image: 'https://images.squarespace-cdn.com/content/v1/5442b6cce4b0cf00d1a3bef2/1617994517472-JHJRHEI85WBTG5G6B4BY/ke17ZwdGBToddI8pDm48kIgDQUuZGudwlQpLCqyQEt8UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8PaoYXhp6HxIwZIk7-Mi3Tsic-L2IOPH3Dwrhl-Ne3Z2kDbnkgg-pjfVtIexCHLh42QYBHVOhwoS7bw-rX645trdZR9z9mxWb0yLUToVqwSd/ethical-shoe-brands-for-every-occasion-allbirds'
    },

  ]


  constructor() {
  }
}
