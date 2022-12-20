import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { AuthGuard } from './guard/auth.guard';
import { CheckoutComponent } from './pages/checkout/checkout.component';



const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./workspaces/user/user-routing.module').then(
        (m) => m.UserRoutingModule
      ),
    canActivate: [AuthGuard],
    // pathMatch: 'full',
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
