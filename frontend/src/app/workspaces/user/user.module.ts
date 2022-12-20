import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { FooterComponent } from 'src/app/layouts/footer/footer.component';
import { NavbarComponent } from 'src/app/layouts/navbar/navbar.component';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { UserComponent } from 'src/app/workspaces/user/user.component';
import { AboutComponent } from 'src/app/pages/about/about.component';
import { BlogComponent } from 'src/app/pages/blog/blog.component';
import { ContactComponent } from 'src/app/pages/contact/contact.component';
// import { CheckoutComponent } from 'src/app/pages/checkout/checkout.component';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    ProductCardComponent,
    HomeComponent,
    UserComponent,
    AboutComponent,
    BlogComponent,
    ContactComponent,
    // CheckoutComponent
  ],
  imports: [CommonModule, UserRoutingModule],
  exports: [NavbarComponent]
})
export class UserModule {}
