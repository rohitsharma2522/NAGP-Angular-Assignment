import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Product } from '../models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private PRODUCT_SERVICE_BASE_URL = "/assets/templates";
  private searchString = new BehaviorSubject('');
  currentString = this.searchString.asObservable();
  private category = new BehaviorSubject('');
  searchByCategory = this.category.asObservable();
  // private _dataListSource: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  // cartList:Observable<Product[]>  = this._dataListSource.asObservable();

  constructor(private readonly http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    const url = `${this.PRODUCT_SERVICE_BASE_URL}/products.json`;
    return this.http.get<Product[]>(url);
  }

  public getProduct(productId: string): Observable<Product> {
    const url = `${this.PRODUCT_SERVICE_BASE_URL}/product.json`;
    return this.http.get<Product>(url);
  }

  // public addToCart(product: any): void {
  //   this._dataListSource.next(this._dataListSource.getValue().concat([product]));
  // }
  // public getCartList(): any{
  //   return this.cartList;
  // }
  changeMessage(message: string) {
    this.searchString.next(message);
  }
  filterCategory(message: string) {
    this.category.next(message);
  }

}
