import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartItemsPageRoutingModule } from './cart-items-routing.module';

import { CartItemsPage } from './cart-items.page';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NgxLoadingModule } from 'ngx-loading';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartItemsPageRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    NgxLoadingModule,
    MatSortModule,
    NgPipesModule
  ],
  declarations: [CartItemsPage]
})
export class CartItemsPageModule {}
