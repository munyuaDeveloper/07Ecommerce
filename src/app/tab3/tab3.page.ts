import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ModalController, ToastController} from '@ionic/angular';
import {LoginModalPage} from './login-modal/login-modal.page';
import {AuthenticationService} from './services/authentication.service';
import jwt_decode from "jwt-decode"
import {UserDetails, User_role} from './userInterface';
import {NgxPermissionsService} from 'ngx-permissions';
import { RegistrationModalPage } from './registration-modal/registration-modal.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  showRegistrationForm = true;
  @ViewChild('customLoadingTemplate', {static: false}) customLoadingTemplate: TemplateRef<any>;
  loading = false;
  LoginForm: FormGroup;
  isUserLoggedIn: boolean;
  userEmail: any;
  setEmail: any;
  userDetails: any;

  userProfile: UserDetails;
  user_roles: User_role[]

  constructor(
    public modalController: ModalController,
    public router: Router,
    private _formBuilder: FormBuilder,
    public _authService: AuthenticationService,
    private permissionsService: NgxPermissionsService,
    public toastController: ToastController
  ) {

  }

  ngOnInit() {
    this.LoginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
    this.isUserLoggedIn = this._authService.loggedIn();
    if (this.isUserLoggedIn) {
      this.GetUserProfile();
    }

  }

  async openModal() {
    const modal = await this.modalController.create({
      component: RegistrationModalPage,
    });

    modal.onDidDismiss().then(res => {
      if (res['data']) {
        this.isUserLoggedIn = this._authService.loggedIn()
        if (this.isUserLoggedIn) {
          this.GetUserProfile()
          this.router.navigate(['/'])
        }
      }
    })

    return await modal.present();
  }

  loginUser(body) {
    this._authService.loginUser(body).subscribe(res => {
      this.loading = false;
      localStorage.setItem('access_token', res['access'])
      localStorage.setItem('refresh_token', res['refresh'])
      this.presentToast('Logged in successfully!');
      this.isUserLoggedIn = this._authService.loggedIn();
      this.GetUserProfile()

      this.router.navigate(['/'])
    }, error => {
      this.loading = false;
    });
  }


  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }

  GetUserProfile() {
    this.loading = true;
    this._authService.userProfile().subscribe(res => {
      this.loading = false;
      this.userDetails = res['data'];

      this.user_roles = res['data']['user_roles']
      let roles = []
      for (let i = 0; i < this.user_roles.length; i++) {
        roles.push(this.user_roles[i]['name'])
      }

      this.permissionsService.loadPermissions(roles);

    }, error => {
      this.loading = false;
    })
  }

  LogoutUser() {
    this._authService.logoutUser();
    this.isUserLoggedIn = this._authService.loggedIn()
    this.permissionsService.flushPermissions();
  }
}
