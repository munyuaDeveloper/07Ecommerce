import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ResellerTablePage } from './reseller-table/reseller-table.page';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {


  constructor(
    public modalController: ModalController,
  ) { }

  ngOnInit() {
   
  }

  async openResellerTable() {
    const modal = await this.modalController.create({
      component: ResellerTablePage,
    });

    modal.onDidDismiss().then(res => {
      if (res['data']) {
      }
    })

    return await modal.present();
  }
  
}
