import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationModalPageRoutingModule } from './registration-modal-routing.module';

import { RegistrationModalPage } from './registration-modal.page';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
 
    IonicModule,
    ReactiveFormsModule,
    RegistrationModalPageRoutingModule,
    NgxLoadingModule.forRoot({})
  ],
  declarations: [RegistrationModalPage]
})
export class RegistrationModalPageModule {}
