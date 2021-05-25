import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResellerTablePageRoutingModule } from './reseller-table-routing.module';

import { ResellerTablePage } from './reseller-table.page';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResellerTablePageRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule
  ],
  declarations: [ResellerTablePage]
})
export class ResellerTablePageModule {}
