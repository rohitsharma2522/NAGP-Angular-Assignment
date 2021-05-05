import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../core/public_api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  products: Product[] = [];
  userLoggedIn : boolean = false;
  constructor(private readonly route: ActivatedRoute, private readonly router: Router) { 
    if(localStorage.getItem('isLoggedIn') === 'Yes'){
      this.userLoggedIn = true
    }
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.products = data.productList;
    })
  }

  viewProduct(productCode: string) {
    alert(productCode)
    this.router.navigateByUrl('/product/' + productCode);
  }

}
