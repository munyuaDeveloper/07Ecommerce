import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.page.html',
  styleUrls: ['./login-modal.page.scss'],
})
export class LoginModalPage implements OnInit {


  LoginForm: FormGroup;
  constructor(public loginModal: ModalController,
    private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.LoginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  dismiss(data) {
    this.loginModal.dismiss(data)
  }

}
