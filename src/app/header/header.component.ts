import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import { TranslateService } from '@ngx-translate/core';

import {
  Product,
  ProductService,
  CartService,
} from '../../app/core/public_api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userLoggedIn: boolean = false;
  searchProduct: string = '';
  public cartCount: number;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private readonly productService: ProductService,
    private readonly cartService: CartService,
    public translate: TranslateService
  ) {
    this.loginService.userLoggedIn.subscribe((s) => {
      if (localStorage.getItem('isLoggedIn') === 'Yes') {
        this.userLoggedIn = true;
      } else {
        this.userLoggedIn = false;
      }
    });
  }
  ngOnInit() {
    this.cartService.cartListSubject.subscribe((res) => {
      if (localStorage.getItem('isLoggedIn') === 'Yes') {
        this.cartCount = res.length;
        console.log('cartCount', this.cartCount);
      }
    });
    if (localStorage.getItem('cartOrders'))
      this.cartService.reloadCart(
        JSON.parse(localStorage.getItem('cartOrders'))
      );
    //this.updateLogin();
  }
  // updateLogin(){
  //   this.loginService.userLoggedIn.subscribe( c => {
  //     this.userLoggedIn = c
  //   })
  //   console.log(this.userLoggedIn)
  //   return this.userLoggedIn;
  // }
  logoutUser() {
    this.loginService.logoutUser();
    localStorage.removeItem('isLoggedIn');
    this.cartService.cartListSubject.next([]);
    this.cartCount = 0;
    localStorage.removeItem('cartOrders');
    this.userLoggedIn = false;
    this.router.navigateByUrl('/login');
  }
  myFunc() {
    this.productService.changeMessage(this.searchProduct);
  }

  filterProducts(category:string) {
    this.productService.filterCategory(category);
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
  redirectToHome() {
    this.router.navigateByUrl('/dashboard');

    this.productService.changeMessage('');
  }
}
