import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map  } from 'rxjs/operators';

import { Product, ProductService } from '../core/public_api';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<Product> {
  response = new BehaviorSubject<any>(null)
  constructor(private readonly productService: ProductService) {
    
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const productId = route.paramMap.get('productId');
    
    let data: Product[] = []
    this.productService.getProducts().subscribe((res: Product[]) => {
      data = res.filter(o => {
        return o.id === productId
      });;
    })
    this.response.next(data[0]);
    return this.response.asObservable();

    // .subscribe(p => {
    //   p.map(products => {
    //     products.filter(prod => prod.id === productId);
    //   });
    // });

  }
}

