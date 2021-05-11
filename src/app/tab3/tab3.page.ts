import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoginModalPage } from './login-modal/login-modal.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  showRegistrationForm = true;

  constructor(
    public modalController: ModalController,
    public router: Router
  ) { }

  async openModal() {
    const modal = await this.modalController.create({
      component: LoginModalPage,
    });

    modal.onDidDismiss().then(res => {
      if (res['data']) {
        this.showRegistrationForm = false;
      }
    })


    return await modal.present();
  }

}
