import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersPageRoutingModule } from './orders-routing.module';

import { OrdersPage } from './orders.page';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgxLoadingModule } from 'ngx-loading';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersPageRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    NgxLoadingModule,
    MatSortModule,
    NgPipesModule
  ],
  declarations: [OrdersPage]
})
export class OrdersPageModule { }
