import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ModalController, ToastController} from '@ionic/angular';
import {LoginModalPage} from './login-modal/login-modal.page';
import {AuthenticationService} from './services/authentication.service';
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
  @ViewChild('customLoadingTemplate', {static: false}) customLoadingTemplate: TemplateRef<any>;
  loading = false;
  RegistrationForm: FormGroup;
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
    this.RegistrationForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      user_type: [null]
    })
    this.isUserLoggedIn = this._authService.loggedIn();
    if (this.isUserLoggedIn) {
      this.GetUserProfile();
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
    this._authService.UserRegistration(body).subscribe(res => {
      this.loading = false;
      this.loginUser(body);
    }, error => {
      this.loading = false;
    })
  }
  loginUser(body) {
    this._authService.loginUser(body).subscribe(res => {
      this.loading = false;
      localStorage.setItem('access_token', res['access'])
      localStorage.setItem('refresh_token', res['refresh'])
      this.presentToast();
      this.isUserLoggedIn = this._authService.loggedIn();
      this.GetUserProfile()
    }, error => {
      this.loading = false;
    });
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Account created successfully!',
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
    for(let i=0; i< this.user_roles.length; i++) {
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
