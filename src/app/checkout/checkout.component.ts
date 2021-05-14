import { Component, OnInit } from '@angular/core';
import { Checkout } from './checkout';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup
  submitted = false;
  constructor(public formBuilder: FormBuilder, private router: Router) {
    this.checkoutForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      address2:[''],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required]],
    })  
   }

  ngOnInit(): void {
  }
  get f() { return this.checkoutForm.controls; }
  submitCheckoutForm () {
    this.submitted = true;

    // stop here if form is invalid
    if (this.checkoutForm.invalid) {
        return;
    }

    this.router.navigateByUrl('/order-placed');
  }
}
