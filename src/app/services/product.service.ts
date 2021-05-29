import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import { ProductInterface } from '../shared/productsInterface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  base_url = environment.DEVELOPMENT_API;
  private _product_list = this.base_url + '/products/product-list';
  private _product_detail = this.base_url + '/products/product-details/';

  private _createProduct = this.base_url + '/products/product-create';

  private _categories = this.base_url + '/category/category-list';

  private _createCategory = this.base_url + '/category/create-category'

  private _upLoadImages = this.base_url + '/fileupload/upload-image';

  private _addToCart = this.base_url + '/cart/add-cart/';

  private _listCart = this.base_url + '/cart/cart';

  private _deleteCart = this.base_url + '/cart/delete-cart/';

  private _filterProductByCategory  = this.base_url + '/category/category-products?request_id='



  constructor(private http: HttpClient, private _router: Router) {
  }

  getProducts() {
    return this.http.get(this._product_list);
  }

  getProductDetail(id) {
    return this.http.get(this._product_detail + id);
  }

  getCategory() {
    return this.http.get(this._categories);
  }

  getProductsByCategory(id) {
    return this.http.get(this._filterProductByCategory + id);
  }

  createProduct(data) {
    return this.http.post(this._createProduct, data);
  }

  createCategory(data) {
    return this.http.post(this._createCategory, data);
  }

  addToCart(data) {
    return this.http.post(this._addToCart, data);
  }

  getCartItems() {
    return this.http.get(this._listCart);
  }

  deleteCart(data) {
    return this.http.post(this._deleteCart, data);
  }


  // uploadImages(files) {
  //   const headers = new HttpHeaders()
  //     .set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
  //   return this.http.post<any>(this._upLoadImages, files, {
  //     headers: headers,
  //   });
  // }



  uploadImage(file) {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
 
    return this.http.post(`${this._upLoadImages}`, file, {
      headers
    });
  }
}
