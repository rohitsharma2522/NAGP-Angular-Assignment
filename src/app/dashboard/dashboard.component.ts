import { Component, OnInit, Input   } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductService } from '../core/public_api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  products: Product[] = [];
  userLoggedIn : boolean = false;
  searchProduct: string="";
  searchProductsByCategory : string="";
  constructor(private readonly route: ActivatedRoute, private readonly router: Router, private productService: ProductService) { 

    if(localStorage.getItem('isLoggedIn') === 'Yes'){
      this.userLoggedIn = true
    }
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.products = data.productList;
    });

    // this.productService.getCartList().subscribe((res: Product[]) => {
    //     console.log("cart list");
    //     console.log(res);
    // });
    this.productService.currentString.subscribe(message => {
      this.searchProduct = message;
      let data;
      this.productService.getProducts().subscribe((res: Product[]) => {
        if(!this.searchProduct) {
          this.products = res;
          return;
        }
        data = res.filter(o => {
          return o.name.toLowerCase().indexOf(this.searchProduct.toLowerCase()) != -1;
        });
        this.products = data;
      });
      
    });
    this.productService.searchByCategory.subscribe(message => {
      this.searchProductsByCategory = message;
      let data;
      this.productService.getProducts().subscribe((res: Product[]) => {
        if(!this.searchProductsByCategory) {
          this.products = res;
          return;
        }
        data = res.filter(o => {
          return o.category.toLowerCase().indexOf(this.searchProductsByCategory.toLowerCase()) != -1;
        });
        this.products = data;
      });
      
    });

  }

  viewProduct(productCode: string) {
    // this.router.navigateByUrl('/product/' + productCode);
    this.router.navigate(['/product/',productCode])
  }

}
