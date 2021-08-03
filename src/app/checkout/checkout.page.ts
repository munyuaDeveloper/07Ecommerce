import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../tab3/services/authentication.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  @ViewChild('customLoadingTemplate', { static: false }) customLoadingTemplate: TemplateRef<any>;
  loading = false;

  CheckoutForm: FormGroup;
  isUserLoggedIn: boolean;
  cartId: string;

  constructor(private _formBuilder: FormBuilder,
    public toastController: ToastController,
    private activatedRouter: ActivatedRoute,
    private productService: ProductService,
    private _router: Router) {
  }

  ngOnInit() {

    this.activatedRouter.paramMap.subscribe(params => {
      this.cartId = params.get('cartId');
    });
    this.CheckoutForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      pickup_location: ['', Validators.required],
      method_of_payment: ['PAYPAL', Validators.required],
      card_number: [''],
      card_owner: [''],
      card_cvc: [''],
      cart: [this.cartId]
    })
  }

  Checkout() {
    console.log('data', this.CheckoutForm.value);
    this.loading = true;
    this.productService.createOrder(this.CheckoutForm.value).subscribe(res => {
      this.loading = false;
      this._router.navigate(['/tabs/tab1/orders']);
      this.presentToast("Order created successfull", 'success');

    }, err => {
      this.loading = false;
      this.presentToast("Error creating order", 'danger');
    });
  }

  async presentToast(message: string, ToastColor: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: ToastColor,
    });
    toast.present();
  }
}


