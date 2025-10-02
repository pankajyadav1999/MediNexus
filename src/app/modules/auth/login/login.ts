import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login implements OnInit {
  loginForm: FormGroup;
  signupForm: FormGroup;
  submittedLogin = false;
  submittedSignup = false;
  isLoginMode = true;
  logoPath: string = 'images/medinb.png';

  roles: string[] = []; // Role dropdown ke liye
  countryCodes = [
    { code: '+91', name: 'India' },
    { code: '+1', name: 'USA' },
    { code: '+44', name: 'UK' },
    { code: '+61', name: 'Australia' },
    { code: '+971', name: 'UAE' },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    // Login Form
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // Signup Form
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      countryCode: ['+91', Validators.required],
      phone: ['', [Validators.required,Validators.pattern(/^[0-9]{10,12}$/)]],
      roleName: ['', Validators.required],
    });
  }

  allowNumbersOnly(event: KeyboardEvent) {
  const charCode = event.key;
  if (!/[0-9]/.test(charCode)) {
    event.preventDefault(); 
  }
}

  ngOnInit(): void {
    // ----Roles load karna backend--- se----//
    this.auth.getRoles().subscribe({
      next: (res) => {
        this.roles = res; // ["Admin", "Doctor", "Nurse"...]
      },
      error: (err) => console.error('Failed to load roles', err),
    });
  }

  // Shortcuts
  get lf() {
    return this.loginForm.controls;
  }
  get sf() {
    return this.signupForm.controls;
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.clearForm();
  }

  clearForm() {
    this.loginForm.reset();
    this.signupForm.reset({
      countryCode: '+91',
    });
    this.submittedLogin = false;
    this.submittedSignup = false;
  }

  // LOGIN SUBMIT
  onLoginSubmit() {
    this.submittedLogin = true;
    if (this.loginForm.invalid) return;

    const loginData = {
      Username: this.loginForm.get('username')?.value,
      Password: this.loginForm.get('password')?.value,
    };

    this.auth.loginApi(loginData).subscribe({
      next: (res) => {
        if (res?.token) {
          // Real token + role save
          this.auth.saveAuth(res.token, res.roleName || 'User');
          alert(res.message || 'Login successful!');
          this.router.navigate(['/dashboard']);
        } else {
          alert('Login failed');
        }
      },
      error: (err: HttpErrorResponse) =>
        alert(err?.error?.message || 'Invalid credentials'),
    });
  }

  // SIGNUP SUBMIT
  onSignupSubmit() {
    this.submittedSignup = true;
    if (this.signupForm.invalid) return;

    const fullPhone =
      this.signupForm.get('countryCode')?.value +
      this.signupForm.get('phone')?.value;

    const signupData = {
      Username: this.signupForm.get('username')?.value,
      Email: this.signupForm.get('email')?.value,
      Password: this.signupForm.get('password')?.value,
      Phone: fullPhone,
      RoleName: this.signupForm.get('roleName')?.value,
    };

    this.auth.registerApi(signupData).subscribe({
      next: (res) => {
        alert(res.message || 'Signup successful! Please login.');
        this.toggleMode();
      },
      error: (err: HttpErrorResponse) =>
        alert(err?.error?.message || 'Signup failed!'),
    });
  }
}
