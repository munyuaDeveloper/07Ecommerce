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
    loadChildren: () => import('../product-details/product-details.module').then(m => m.ProductDetailsPageModule)
  },
  {
    path: 'cart-items',
    loadChildren: () => import('../cart-items/cart-items.module').then(m => m.CartItemsPageModule)
  },
  {
    path: 'wish-list',
    loadChildren: () => import('../wish-list/wish-list.module').then(m => m.WishListPageModule)
  },
  {
    path: 'checkout/:cartId',
    loadChildren: () => import('../checkout/checkout.module').then(m => m.CheckoutPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('../orders/orders.module').then(m => m.OrdersPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule { }
