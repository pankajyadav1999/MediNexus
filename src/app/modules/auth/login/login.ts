import { Component } from '@angular/core';
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
  styleUrls: ['./login.css']
})
export class Login {
  loginForm: FormGroup;
  signupForm: FormGroup;
  submittedLogin = false;
  submittedSignup = false;
  isLoginMode = true;
  logoPath: string = 'images/medinb.png';  
  selectedImageFile: File | null = null;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {
    // Login Form
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: [
        '', 
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$')
        ]
      ],
    });

    // Signup Form
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$')
        ]
      ],
      role: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      profileImage: [''] // optional
    });
  }

  // Shortcuts
  get lf() { return this.loginForm.controls; }
  get sf() { return this.signupForm.controls; }

  // Toggle login/signup mode
  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.clearForm();
  }

  clearForm() {
    this.loginForm.reset();
    this.signupForm.reset();
    this.submittedLogin = false;
    this.submittedSignup = false;
    this.selectedImageFile = null;
  }

  // File change
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedImageFile = event.target.files[0];
    }
  }

  // Login submit
  onLoginSubmit() {
    this.submittedLogin = true;
    if (this.loginForm.invalid) return;

    this.auth.loginApi(this.loginForm.value).subscribe({
      next: res => {
        console.log('Login Response:', res);
        this.auth.saveAuth('dummy-token', res.username);
        this.router.navigate(['/dashboard']);
        this.clearForm();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Login Failed:', err);
        alert('Invalid username or password!');
      }
    });
  }

  // Signup submit
  onSignupSubmit() {
    this.submittedSignup = true;
    if (this.signupForm.invalid) return;

    const formData = new FormData();
    formData.append('username', this.signupForm.get('username')?.value);
    formData.append('password', this.signupForm.get('password')?.value);
    formData.append('role', this.signupForm.get('role')?.value);

    if (this.selectedImageFile) {
      formData.append('profileImage', this.selectedImageFile);
    }

    this.auth.registerApi(formData).subscribe({
      next: res => {
        console.log('Signup Response:', res);
        alert(res.message || 'Signup successful! Please login.');
        this.toggleMode();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Signup Failed:', err);
        alert('Signup failed!');
      }
    });
  }
}
