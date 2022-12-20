import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PayloadSignIn } from 'src/app/interface/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  formLogin = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}
  onSubmit() {
    if (this.formLogin.valid) {
      this.authService.signin(<PayloadSignIn>this.formLogin.value).subscribe(
        (res:any) => {
          this.authService.setTokenValue(res.token)
          this.router.navigate(['/home']);
        },
        (error) => {
          alert(error);
        }
      );
    }
  }
}
