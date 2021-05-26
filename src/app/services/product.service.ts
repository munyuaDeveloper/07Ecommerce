import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  base_url = environment.DEVELOPMENT_API;
  private _product_list = this.base_url + '/products/product-list';
  private _product_detail = this.base_url + '/products/product-details/';

  private _createProduct = this.base_url + '/products/product-create';

  private _categories = this.base_url + '/category/category-list';

  private _upLoadImages = this.base_url + '/fileupload/upload-image';


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

  createProduct(data) {
    return this.http.post(this._createProduct, data);
  }
  uploadImages(files) {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.post<any>(this._upLoadImages, files, {
      headers: headers,
    });
  }
}
