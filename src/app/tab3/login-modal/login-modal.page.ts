import {ModalController, ToastController} from '@ionic/angular';
import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.page.html',
  styleUrls: ['./login-modal.page.scss'],
})
export class LoginModalPage implements OnInit {
  @ViewChild('customLoadingTemplate', {static: false}) customLoadingTemplate: TemplateRef<any>;
  loading = false;

  LoginForm: FormGroup;

  constructor(public loginModal: ModalController,
              private _formBuilder: FormBuilder,
              public toastController: ToastController,
              private _authService: AuthenticationService) {
  }

  ngOnInit() {
    this.LoginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  dismiss(data) {

    if (data) {
      this.loading = true;
      this._authService.loginUser(data).subscribe(res => {
        this.loading = false;
        localStorage.setItem('access_token', res['access'])
        localStorage.setItem('refresh_token', res['refresh'])
        this.loginModal.dismiss(data)
        this.presentToast()
      }, error => {
        this.loading = false;
      });
    } else {
      this.loginModal.dismiss(null);
    }

  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Login successful!',
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }
}
