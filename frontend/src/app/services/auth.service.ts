import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, map } from 'rxjs/operators';
import { Product } from '../interface/product';
import { PayloadSignIn, PayloadSignUp } from '../interface/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:4000/';
  token: BehaviorSubject<string>;

  constructor(private httpClient: HttpClient) {
    let token =
      localStorage.getItem('token') == null
        ? ''
        : localStorage.getItem('token')!;
    this.token = new BehaviorSubject<string>(token);
  }

  public signup(payload: PayloadSignUp) {
    return this.httpClient.post(this.url + 'auth/sign-up', payload).pipe(
      first(),
      map((data) => {
        return data;
      })
    );
  }
  public signin(payload: PayloadSignIn) {
    return this.httpClient.post(this.url + 'auth/sign-in', payload).pipe(
      first(),
      map((data) => {
        return data;
      })
    );
  }
  public signout() {
    return this.httpClient.delete(this.url + 'auth/sign-out').pipe(
      first(),
      map((data) => {
        return data;
      })
    );
  }

  public setTokenValue(data: string) {
    localStorage.setItem('token', data);
    this.token.next(data);
  }

  public get tokenValue(): string {
    return this.token.value;
  }
}
