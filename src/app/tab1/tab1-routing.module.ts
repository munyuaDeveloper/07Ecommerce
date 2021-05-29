import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: 'product-details/:id',
    loadChildren: () => import('../product-details/product-details.module').then( m => m.ProductDetailsPageModule)
  },
  {
    path: 'cart-items',
    loadChildren: () => import('../cart-items/cart-items.module').then( m => m.CartItemsPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
