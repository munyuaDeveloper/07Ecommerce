import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoadingController, ModalController} from "@ionic/angular";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  productForm: FormGroup;
  categories = [];
  selectedFile = null;
  fileIDs = {};
  allFiles = new FormData();
  product_images = [];
  application_documents: any;

  constructor(public addProductModal: ModalController,
              private loadingController: LoadingController,
              private _formBuilder: FormBuilder,
              private _productService: ProductService) {
  }

  ngOnInit() {
    this.getCategory();
    this.productForm = this._formBuilder.group({
      category: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      images: [[]],
    });
  }

  dismiss(data) {
    if (data) {

    } else {
      this.addProductModal.dismiss(null);
    }
  }

  getCategory(){
    this._productService.getCategory().subscribe(res=>{
      this.categories = res['results'];
    })
  }

  // handle supporting doc uploads
  handleSupportingDocUpload(e) {
    this.selectedFile = e.target.files;
    for (let i = 0; i < this.selectedFile.length; i++) {
      this.allFiles.append('image', this.selectedFile[i]);
      this.fileIDs['image'] = null;
      this.product_images.push(e.target.files[0].name);
    }
  }
  openInput() {
    document.getElementById('fileInput').click();
  }

  createProduct() {
    this.productForm.patchValue({
      images : this.application_documents
    })
    this._productService.createProduct(this.productForm.value).subscribe(res => {
      console.log(res);
      this.addProductModal.dismiss(this.productForm.value);
    }, error => {
      console.error(error);
    });
  }

  submitFiles() {
    this._productService.uploadImages(this.allFiles).subscribe(res => {
      this.application_documents = res;
      this.createProduct();
    });
  }
}

