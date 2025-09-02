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

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.signupForm = this.fb.group({
      username: ['', Validators.required],
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

onLoginSubmit() {
  this.submittedLogin = true;
  if (this.loginForm.invalid) return;

  const token = 'demo-token-' + Date.now();
  const role = localStorage.getItem('role') || 'Admin'; // demo role

  this.auth.login(token, role);

  this.router.navigate(['/dashboard']); // redirect to dashboard
}

  onSignupSubmit() {
    this.submittedSignup = true;
    if (this.signupForm.invalid) return;

    // Save role temporarily for demo
    localStorage.setItem('role', this.signupForm.value.role);

    console.log('Signup Data:', this.signupForm.value);
    alert('Signup successful! Please login.');
    this.toggleMode();
  }
}
