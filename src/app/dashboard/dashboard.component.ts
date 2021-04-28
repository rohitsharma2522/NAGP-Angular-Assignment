import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '@nagp/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  products: Product[] = [];

  constructor(private readonly route: ActivatedRoute, private readonly router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.products = data.productList;
    })
  }

}
