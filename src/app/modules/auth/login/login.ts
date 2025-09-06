import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginForm: FormGroup;
  signupForm: FormGroup;
  submittedLogin = false;
  submittedSignup = false;
  isLoginMode = true;
    logoPath: string = 'images/medinb.png';  

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required,Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.signupForm = this.fb.group({
      username: ['', Validators.required, Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
    });
  }

  get lf() { return this.loginForm.controls; }
  get sf() { return this.signupForm.controls; }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.submittedLogin = false;
    this.submittedSignup = false;
  }

  // ✅ Login with API
  onLoginSubmit() {
    this.submittedLogin = true;
    if (this.loginForm.invalid) return;

    this.auth.loginApi(this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log('Login Response:', res);
        this.auth.saveAuth('dummy-token', res.username); // token dummy rakha kyunki API token nahi bhej rahi
        this.router.navigate(['/dashboard']);
        // clear function to reast click login
        this.loginForm.reset();
        this.submittedLogin=false;
      },
      error: (err) => {
        console.error('Login Failed:', err);
        alert('Invalid username or password!');
      }
    });
  }

  // ✅ Signup with API
  onSignupSubmit() {
    this.submittedSignup = true;
    if (this.signupForm.invalid) return;

    this.auth.registerApi(this.signupForm.value).subscribe({
      next: (res: any) => {
        console.log('Signup Response:', res);
        alert(res.message || 'Signup successful! Please login.');
        this.toggleMode();
        //  Reset form after successful signup
        this.signupForm.reset();
        this.submittedSignup = false;
      },
      error: (err) => {
        console.error('Signup Failed:', err);
        alert('Signup failed!');
      }
    });
  }
}
