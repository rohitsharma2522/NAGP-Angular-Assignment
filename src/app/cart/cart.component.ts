import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Product, ProductService } from '../core/public_api';
import {CartService} from "../core/services/cart.service";
import { ToastrService } from 'ngx-toastr';
import {Cart} from "../core/models/cart";
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent  {
  @Output() onChange = new EventEmitter<number>();
  public cartList:Cart[];
  public totalPrice: number;
  quantity: number;
  constructor(protected cartService: CartService, private router: Router, private toastrService: ToastrService) {
      this.loadCart();
  }
  loadCart = () => {
    this.cartService.cartListSubject
        .subscribe(res => {
            this.cartList = res;
            console.log("Res is ", this.cartList)
            let total = 0;
            for(let cart of this.cartList) {
                total += cart.product.price * cart.quantity;
            }
            this.totalPrice = total;
        })
  };
  removeFromCart = index => {
      this.cartService.removeCart(index);
  };
  changeQuantity = (cart,quantity) => {
    console.log("changing quantity");
    cart.quantity = quantity;
    this.cartService.reloadCart(this.cartList);
  }
  redirectToCheckoutScreen = () => {
    this.router.navigateByUrl('/checkout');
  }
}
