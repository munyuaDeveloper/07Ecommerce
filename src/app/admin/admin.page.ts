import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { ModalController } from '@ionic/angular';
import { ResellerTablePage } from './reseller-table/reseller-table.page';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  displayedColumns = ['id', 'name', 'email', 'products', 'actions'];
  dataSource = new MatTableDataSource()
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('ResellerPaginator', {static: false}) ResellerPaginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort;

resellers = [
  {
      "name": "Peter Munyua",
      "email": "munyuapeter07@gmail.com",
      "products": "30"
  },
  {
    "name": "Peter Munyua",
    "email": "munyuapeter07@gmail.com",
    "products": "30"
},
{
    "name": "Peter Munyua",
    "email": "munyuapeter07@gmail.com",
    "products": "30"
},
{
    "name": "Peter Munyua",
    "email": "munyuapeter07@gmail.com",
    "products": "30"
},
{
    "name": "Peter Munyua",
    "email": "munyuapeter07@gmail.com",
    "products": "30"
},
{
    "name": "Peter Munyua",
    "email": "munyuapeter07@gmail.com",
    "products": "30"
},
{
    "name": "Peter Munyua",
    "email": "munyuapeter07@gmail.com",
    "products": "30"
},
]

  constructor(
    public modalController: ModalController,
  ) { }

  ngOnInit() {
      this.dataSource.data = this.resellers;
  }

  ngAfterViewInit() {
      this.dataSource.paginator = this.ResellerPaginator
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
