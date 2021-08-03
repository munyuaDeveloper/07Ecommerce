export interface Image {
  image: string;
}

export interface Seller {
  email: string;
  name: string;
}

export interface Category {
  name: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  images: Image[];
  seller: Seller;
  category: Category[];
}

export interface Cart {
  id: number;
  products_num: number;
  product: Product;
  total: number;
}

export interface Result {
  id: number;
  cart_status: string;
  cart: Cart[];
}

export interface CartDetails {
  count: number;
  next?: any;
  previous?: any;
  results: Result[];
}
