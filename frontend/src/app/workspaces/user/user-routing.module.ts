import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from 'src/app/pages/about/about.component';
import { BlogComponent } from 'src/app/pages/blog/blog.component';
import { ContactComponent } from 'src/app/pages/contact/contact.component';
// import { CheckoutComponent } from 'src/app/pages/checkout/checkout.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '', component: UserComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'blog',
        component: BlogComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
