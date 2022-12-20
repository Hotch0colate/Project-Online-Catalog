import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PayloadSignUp } from 'src/app/interface/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}
  onSubmit() {
    if(this.form.valid){
      this.authService.signup(<PayloadSignUp>this.form.value).subscribe(
        (res) => {
          this.router.navigate(['/signin']);
        },
        (error) => {
          alert(error);
        }
      )
    }
  }
  
}
