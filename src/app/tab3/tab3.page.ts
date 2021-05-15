import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { LoginModalPage } from './login-modal/login-modal.page';
import { AuthenticationService } from './services/authentication.service';
import jwt_decode from "jwt-decode"

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  showRegistrationForm = true;

  RegistrationForm: FormGroup;
  isUserLoggedIn: boolean;
  userEmail: any;
  setEmail: any;

  constructor(
    public modalController: ModalController,
    public router: Router,
    public _authService: AuthenticationService,
    private _formBuilder: FormBuilder,
    private loadingController: LoadingController
  ) {

   }

  ngOnInit() {
    this.RegistrationForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required]
    })
    this.isUserLoggedIn = this._authService.loggedIn();
    if(this.isUserLoggedIn) {
      this.decodeJWT();
      // this.GetUserProfile()
    }

  }

  async openModal() {
    const modal = await this.modalController.create({
      component: LoginModalPage,
    });

    modal.onDidDismiss().then(res => {
      if (res['data']) {
        this.isUserLoggedIn = this._authService.loggedIn()
        if(this.isUserLoggedIn) {
          // this.GetUserProfile()
          this.decodeJWT();
        }
      }
    })

    return await modal.present();
  }

  RegisterUser() {
    const body = this.RegistrationForm.value;
    this.handleLoadingEffect()
    this._authService.UserRegistration(body).subscribe(res=>{
      this.openModal();
    })
  }

  GetUserProfile() {
    this._authService.userProfile().subscribe(res=>{
      console.log(res);

    })
  }

  LogoutUser() {
    this._authService.logoutUser();
    this.isUserLoggedIn = this._authService.loggedIn()
  }

  decodeJWT(){
    const token = localStorage.getItem('access_token')
    const decoded = jwt_decode(token);
    this.userEmail = decoded['email']
  }

  async handleLoadingEffect() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2500
    });

    await loading.present();
  }
}
