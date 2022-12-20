import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, map } from 'rxjs/operators';
import { Cart, CartArray, Product } from '../interface/product';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'http://localhost:4000/'
  cart: BehaviorSubject<CartArray>;
  constructor(private httpClient: HttpClient) { 
    this.cart = new BehaviorSubject<CartArray>({data:[]})
  }
  public addCart(data:Cart){
    this.cart.value.data?.push(data)
    this.cart.next(this.cart.value)
  }
  public getProducts(){
    return this.httpClient.get(this.url+'product').pipe(
      first(),
      map((data) => {        
        return <Product[]> data;
      })
    )
  }
  public checkout(payload:CartArray){
    return this.httpClient.post(this.url+'product/order', payload).pipe(
      first(),
      map((data) => {        
        return <Product[]> data;
      })
    )
  }
}
