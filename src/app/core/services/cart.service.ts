import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Product} from "../models/product";
import {Cart} from "../models/cart";

@Injectable({
    providedIn: 'root'
  })
export class CartService {

    public cartListSubject = new BehaviorSubject([]);
    public toggleCartSubject = new BehaviorSubject(false);
    public cartListLocal = new BehaviorSubject([]);
    toggleCart = () => {
        this.toggleCartSubject.next(!this.toggleCartSubject.getValue());
    };
    addToCart = (cart:Cart) => {
        let current = this.cartListSubject.getValue();
        let dup = current.find(c=>c.product.name === cart.product.name);
        if(dup) dup.quantity += cart.quantity;
        else current.push(cart);
        localStorage.setItem("cartOrders", JSON.stringify(current));
        this.cartListSubject.next(current);
    };
    reloadCart = (cartList) => {
        this.cartListSubject.next(cartList);
    };
    removeCart = index => {
        let current = this.cartListSubject.getValue();
        current.splice(index,1);
        localStorage.setItem("cartOrders", JSON.stringify(current));
        this.cartListSubject.next(current);

    };
}