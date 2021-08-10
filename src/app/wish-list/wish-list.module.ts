import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WishListPageRoutingModule } from './wish-list-routing.module';

import { WishListPage } from './wish-list.page';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgPipesModule } from 'ngx-pipes';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WishListPageRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    NgxLoadingModule,
    MatSortModule,
    NgPipesModule,
  ],
  declarations: [WishListPage]
})
export class WishListPageModule { }
