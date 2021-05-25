import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResellerTablePage } from './reseller-table.page';

const routes: Routes = [
  {
    path: '',
    component: ResellerTablePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResellerTablePageRoutingModule {}
