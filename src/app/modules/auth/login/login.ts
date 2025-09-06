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
    // ----Login Form-----//
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
          )
        ]
      ],
    });

    // ----Signup Form-----//
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
          )
        ]
      ],
      role: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
    });
  }

  //----Shortcuts---//
  get lf() { return this.loginForm.controls; }
  get sf() { return this.signupForm.controls; }

  // ----Mode---switch---//
  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.submittedLogin = false;
    this.submittedSignup = false;
    this.clearForm(); // toggle----input---clear----//
  }

  //----Clear---forms----//
  clearForm() {
    this.loginForm.reset();
    this.signupForm.reset();
    this.submittedLogin = false;
    this.submittedSignup = false;
  }

  // -----Login-----//
  onLoginSubmit() {
    this.submittedLogin = true;
    if (this.loginForm.invalid) return;

    this.auth.loginApi(this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log('Login Response:', res);
        this.auth.saveAuth('dummy-token', res.username);
        this.router.navigate(['/dashboard']);
        this.clearForm(); //----Success---clear----//
      },
      error: (err) => {
        console.error('Login Failed:', err);
        alert('Invalid username or password!');
      }
    });
  }

  // ----Signup----//
  onSignupSubmit() {
    this.submittedSignup = true;
    if (this.signupForm.invalid) return;

    this.auth.registerApi(this.signupForm.value).subscribe({
      next: (res: any) => {
        console.log('Signup Response:', res);
        alert(res.message || 'Signup successful! Please login.');
        this.toggleMode();   //---Login---mode--switch
      },
      error: (err) => {
        console.error('Signup Failed:', err);
        alert('Signup failed!');
      }
    });
  }
}
