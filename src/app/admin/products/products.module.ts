import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductsPageRoutingModule } from './products-routing.module';
import { ProductsPage } from './products.page';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPermissionsModule } from 'ngx-permissions';
import {NgxLoadingModule} from "ngx-loading";
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsPageRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    NgxPermissionsModule.forChild(),
    NgxLoadingModule,
    MatSortModule
  ],
  declarations: [ProductsPage]
})
export class ProductsPageModule {}
