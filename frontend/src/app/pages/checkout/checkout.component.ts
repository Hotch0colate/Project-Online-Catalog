import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, CartArray } from 'src/app/interface/product';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cart: Cart[] | null = null;
  amont = 0;

  constructor(private apiService: ApiService, private router: Router) {}
  ngOnInit(): void {
    this.cart = this.apiService.cart.value.data!;
    this.amont = this.cart.reduce(
      (currentValue: number, item: Cart) =>
        (item.product_price * item.total_product) + currentValue,
      0
    );
  }
  onCheckOut() {
    this.apiService.checkout({ data: this.cart! }).subscribe(
      (res: any) => {
        this.apiService.cart.next({data:[]})
        this.router.navigate(['/home']);
      },
      (error) => {
        alert(error);
      }
    );
  }
}
