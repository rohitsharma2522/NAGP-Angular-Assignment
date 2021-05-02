import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from '../app/login/login.component'
import {DashboardComponent} from '../app/dashboard/dashboard.component'
import { ProductsResolver } from './resolver/products.resolver';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent, resolve: {
      productList: ProductsResolver
    }
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent, resolve: {
      productList: ProductsResolver
    }
  },
  // {
  //   path: '',
  //   loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)
  // },
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
