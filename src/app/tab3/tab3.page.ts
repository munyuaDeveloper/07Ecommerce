import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { LoginModalPage } from './login-modal/login-modal.page';
import { AuthenticationService } from './services/authentication.service';
import jwt_decode from "jwt-decode"
import { UserDetails, User_role } from './userInterface';
import { NgxPermissionsService } from 'ngx-permissions';

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

  userProfile: UserDetails;
  user_roles: User_role[]

  constructor(
    public modalController: ModalController,
    public router: Router,
    private _formBuilder: FormBuilder,
    private loadingController: LoadingController,
    public _authService: AuthenticationService,
    private permissionsService: NgxPermissionsService,
  ) {

  }

  ngOnInit() {
    this.RegistrationForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      user_type: [null]
    })
    this.isUserLoggedIn = this._authService.loggedIn();
    if (this.isUserLoggedIn) {
      this.GetUserProfile()
    }

  }

  async openModal() {
    const modal = await this.modalController.create({
      component: LoginModalPage,
    });

    modal.onDidDismiss().then(res => {
      if (res['data']) {
        this.isUserLoggedIn = this._authService.loggedIn()
        if (this.isUserLoggedIn) {
          this.GetUserProfile()
          // this.router.navigate(['/'])
        }
      }
    })

    return await modal.present();
  }

  RegisterUser() {
    if (this.RegistrationForm.value.user_type) {
      this.RegistrationForm.patchValue({
        user_type: 'Reseller'
      })
    }

    const body = this.RegistrationForm.value;

    this.handleLoadingEffect()
    this._authService.UserRegistration(body).subscribe(res => {
      this.openModal();
    })
  }

  GetUserProfile() {
    this._authService.userProfile().subscribe(res => {
      this.userProfile = res['data']

      this.user_roles = res['data']['user_roles']
      let roles = []
      for(let i=0; i< this.user_roles.length; i++) {
        roles.push(this.user_roles[i]['name'])
      }

      this.permissionsService.loadPermissions(roles);
    })
  }

  LogoutUser() {
    this._authService.logoutUser();
    this.isUserLoggedIn = this._authService.loggedIn()

    this.permissionsService.flushPermissions();
  }

  // decodeJWT(){
  //   const token = localStorage.getItem('access_token')
  //   const decoded = jwt_decode(token);
  //   this.userEmail = decoded['email']
  // }

  async handleLoadingEffect() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2500
    });

    await loading.present();
  }
}
