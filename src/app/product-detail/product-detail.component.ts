import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Product, ProductService } from '../../app/core/public_api';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: any;
  response = new BehaviorSubject<any>(null);
  product_id: string;
  quantity: number = 1;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService,
    private toastrService: ToastrService,
    private readonly cartService: CartService
  ) {}

  ngOnInit(): any {
    this.product_id = this.route.snapshot.params.productId;
    console.log('prodid', this.product_id);
    let data: Product[] = [];
    this.productService.getProducts().subscribe((res: Product[]) => {
      console.log('data is ', res);
      data = res.filter((o) => {
        return o.id === this.product_id;
      });
      return (this.product = data[0]);
    });
  }
  _addItemToCart(product): void {
    this.toastrService.success('Cart Updated','Added To Cart Successfully');
    return this.cartService.addToCart({product,quantity:this.quantity});
  }
  changeQuantity = (newQuantity: number) => {
    this.quantity = newQuantity;
  };
}
