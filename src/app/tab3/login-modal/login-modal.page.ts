import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.page.html',
  styleUrls: ['./login-modal.page.scss'],
})
export class LoginModalPage implements OnInit {


  LoginForm: FormGroup;
  constructor(public loginModal: ModalController,
    private _formBuilder: FormBuilder,
    private _authService: AuthenticationService) { }

  ngOnInit() {
    this.LoginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  dismiss(data) {

    if (data) {
      this._authService.loginUser(data).subscribe(res =>{
        console.log(res);
        localStorage.setItem('access_token', res['access'])
        localStorage.setItem('refresh_token', res['refresh'])
        this.loginModal.dismiss(data)
      }, error =>{
          console.error(error)
      });
    }else {
      this.loginModal.dismiss(null);
    }

  }

}
