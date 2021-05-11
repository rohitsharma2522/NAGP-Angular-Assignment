import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from '../app/login/login.component'
import {DashboardComponent} from '../app/dashboard/dashboard.component'
import {ProductDetailComponent} from '../app/product-detail/product-detail.component'

import { ProductsResolver } from './resolver/products.resolver';
import { ProductResolver } from './resolver/product.resolver';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from './guards/auth.guard';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent, resolve: {
      productList: ProductsResolver
    }
  },
  {
    path: 'product/:productId', 
    component: ProductDetailComponent
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '',
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
