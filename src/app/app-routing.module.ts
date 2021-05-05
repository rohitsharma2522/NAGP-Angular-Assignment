import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from '../app/login/login.component'
import {DashboardComponent} from '../app/dashboard/dashboard.component'
import {ProductDetailComponent} from '../app/product-detail/product-detail.component'

import { ProductsResolver } from './resolver/products.resolver';
import { ProductResolver } from './resolver/product.resolver';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent, resolve: {
      productList: ProductsResolver
    }
  },
  {
    path: 'dashboard',
    component: DashboardComponent, resolve: {
      productList: ProductsResolver
    }
  },
  {
    path: 'product/:productId', component: ProductDetailComponent, resolve: {
      product: ProductResolver
    }
  },
  {
    path: 'login',
    component: LoginComponent
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
