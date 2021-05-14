import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart-quantity',
  templateUrl: './cart-quantity.component.html',
  styleUrls: ['./cart-quantity.component.scss']
})
export class CartQuantityComponent implements OnInit {


  @Input() quantity: number;
  @Output() onChange = new EventEmitter<number>();
  constructor() { }

  ngOnInit() { }
  addQuantity = () =>{
      if (this.quantity < 1000){
          this.quantity++;
          this.onChange.emit(this.quantity);
      }
  };
  minusQuantity = () => {
      if (this.quantity > 1){
          this.quantity--;
          this.onChange.emit(this.quantity);
      }
  }

}
