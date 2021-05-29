import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Camera, CameraResultType, CameraSource } from '@capacitor/core';
import {ActionSheetController, LoadingController, ModalController, Platform, ToastController} from "@ionic/angular";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  @ViewChild('customLoadingTemplate', {static: false}) customLoadingTemplate: TemplateRef<any>;
  loading = false;
  productForm: FormGroup;
  CategoryForm: FormGroup;
  categories = [];
  selectedFile = null;
  fileIDs = {};
  allFiles = new FormData();
  product_images = [];
  application_documents: any;

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  constructor(public addProductModal: ModalController,
              public toastController: ToastController,
              private _formBuilder: FormBuilder,
              private _productService: ProductService,
              private plt: Platform,
              private actionSheetCtrl: ActionSheetController) {
  }

  ngOnInit() {
    this.getCategory();
    this.productForm = this._formBuilder.group({
      category: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      images: [[]],
    });

    this.CategoryForm = this._formBuilder.group({
      name: ['', Validators.required],
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
    this.loading = true;
    this.productForm.patchValue({
      images : this.application_documents
    })
    this._productService.createProduct(this.productForm.value).subscribe(res => {
      this.loading = false;
      this.presentToast('Product Created!')
      this.addProductModal.dismiss(this.productForm.value);
    }, error => {
      this.loading = false;
    });
  }


  submitCategory() {
    this.loading = true
    this._productService.createCategory(this.CategoryForm.value).subscribe(res=>{
      this.presentToast('Category Created!')
      this.getCategory()
      this.loading = false;
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



// Upload Images from different devices
 
  async selectImageSource() {
    const buttons = [
      {
        text: 'Take Photo',
        icon: 'camera',
        handler: () => {
          this.addImage(CameraSource.Camera);
        }
      },
      {
        text: 'Choose From Photos',
        icon: 'image',
        handler: () => {
          this.addImage(CameraSource.Photos);
        }
      }
    ];
 
    // Only allow file selection inside a browser
    if (!this.plt.is('hybrid')) {
      buttons.push({
        text: 'Choose a File',
        icon: 'attach',
        handler: () => {
          this.fileInput.nativeElement.click();
        }
      });
    }
 
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image Source',
      buttons
    });
    await actionSheet.present();
  }
 
  async addImage(source: CameraSource) {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source
    });
 
    const blobData = this.b64toBlob(image.base64String, `image/${image.format}`);

    this.allFiles = new FormData();
    this.allFiles.append('image', blobData, `product_image.${image.format}`);
  }
 
  // Used for browser direct file upload
  uploadFile(event: EventTarget) {
    const eventObj: MSInputMethodContext = event as MSInputMethodContext;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const file: File = target.files[0];

    const ext = file.name.split('.').pop();
    this.allFiles = new FormData();
    this.allFiles.append('image', file, `product_image.${ext}`);

  }

    submitFiles() {
    this.loading = true
    this._productService.uploadImage(this.allFiles).subscribe(res => {
      this.application_documents = res;
      this.createProduct();
    }, err => {
      this.loading = false
    });
  }
 

  // Helper function
  // https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
  b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
 
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
 
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
 
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
 
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
}

