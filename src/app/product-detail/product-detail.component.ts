import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../app/core/public_api';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: any;

  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit(): void{
    this.route.data.subscribe(data => {
      console.log(data);
      this.product = data.product;
    })
  }

}
