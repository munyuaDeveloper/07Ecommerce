import { ProductInterface } from './../shared/productsInterface';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  products: ProductInterface[] = [
    {
      title: 'Product one',
      overview: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      price: 200,
      category: 'Clothes',
      image: 'https://d12prgon3aw7l1.cloudfront.net/10449574_img-20200713-wa0029_960x1280.webp'
    },
    {
      title: 'Product one',
      overview: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      price: 200,
      category: 'Clothes',
      image: 'https://d12prgon3aw7l1.cloudfront.net/10449574_img-20200713-wa0029_960x1280.webp'
    },
    {
      title: 'Product one',
      overview: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      price: 200,
      category: 'Clothes',
      image: 'https://d12prgon3aw7l1.cloudfront.net/10449574_img-20200713-wa0029_960x1280.webp'
    },
    {
      title: 'Product one',
      overview: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      price: 200,
      category: 'Clothes',
      image: 'https://d12prgon3aw7l1.cloudfront.net/10449574_img-20200713-wa0029_960x1280.webp'
    },
    {
      title: 'Product one',
      overview: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      price: 200,
      category: 'Clothes',
      image: 'https://d12prgon3aw7l1.cloudfront.net/10449574_img-20200713-wa0029_960x1280.webp'
    },

  ]

  constructor() { }

}
