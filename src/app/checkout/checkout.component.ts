import { Component, OnInit } from '@angular/core';
import { Checkout } from './checkout';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup
  submitted = false;
  constructor(public formBuilder: FormBuilder) {
    this.checkoutForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      message: ['', [Validators.required]]
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

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.checkoutForm.value))
  }
}
