import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorInterceptor, SendInterceptor } from 'src/app/interceptors';
import { SignupComponent } from './pages/signup/signup.component';
import { UserModule } from './workspaces/user/user.module';
import { SigninComponent } from './pages/signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './pages/checkout/checkout.component';




@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    CheckoutComponent,
    
    // NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SendInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
