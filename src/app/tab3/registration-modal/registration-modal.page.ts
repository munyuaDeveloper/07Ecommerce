import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration-modal',
  templateUrl: './registration-modal.page.html',
  styleUrls: ['./registration-modal.page.scss'],
})
export class RegistrationModalPage implements OnInit {
  @ViewChild('customLoadingTemplate', {static: false}) customLoadingTemplate: TemplateRef<any>;
  loading = false;

  RegistrationForm: FormGroup;
  isUserLoggedIn: boolean;

  constructor(public registrationModal: ModalController,
              private _formBuilder: FormBuilder,
              public toastController: ToastController,
              private _router: Router,
              private _authService: AuthenticationService) {
  }

  ngOnInit() {
    this.RegistrationForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      user_type: [null]
    })
  }

  dismiss(data) {
    if (data) {
      this.loading = true;
      if (this.RegistrationForm.value.user_type) {
        this.RegistrationForm.patchValue({
          user_type: 'Reseller'
        })
      }
      const body = this.RegistrationForm.value;
      this._authService.UserRegistration(body).subscribe(res => {
        this.registrationModal.dismiss(body)
      }, error => {
        this.loading = false;
      });
    } else {
      this.registrationModal.dismiss(null);
    }
  }


  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }
}

