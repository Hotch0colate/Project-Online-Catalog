import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  cart_n = 0;
  cardSubscibe : Subscription|null = null
  constructor(
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService
  ) {}
  ngOnInit(): void {
    this.cardSubscibe = this.apiService.cart.subscribe((data) => {
      let n = data.data?.length;
      this.cart_n = n ? n : 0;
    });
  }
  ngOnDestroy(): void {
    this.cardSubscibe?.unsubscribe()
  }
  singout() {
    this.authService.signout().subscribe(
      (res) => {
        localStorage.removeItem('token');
        this.router.navigate(['/signin']);
      },
      (error) => {
        alert(error);
      }
    );
  }
}
