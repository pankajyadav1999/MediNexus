import { Injectable, signal, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5044/api/User'; 
  private _isLoggedIn = signal<boolean>(false);
  private _token = signal<string | null>(null);
  private _role = signal<string | null>(null);
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {
    if (isPlatformBrowser(this.platformId)) {
      const savedToken = localStorage.getItem('token');
      const savedRole = localStorage.getItem('role');
      if (savedToken) this._token.set(savedToken);
      if (savedRole) this._role.set(savedRole);
      if (savedToken) this._isLoggedIn.set(true);
    }
  }

  // 🔹 Login API
  loginApi(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/Login`, credentials);
  }

  // 🔹 Register API (FormData accept kare)
  registerApi(userData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/Register`, userData);
  }

  saveAuth(tokenOrUser: string, role: string) {
    this._token.set(tokenOrUser);
    this._isLoggedIn.set(true);
    this._role.set(role);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', tokenOrUser);
      localStorage.setItem('role', role);
    }
  }

  logout() {
    this._token.set(null);
    this._isLoggedIn.set(false);
    this._role.set(null);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
  }

  isLoggedIn() {
    return this._isLoggedIn();
  }

  getRole() {
    return this._role();
  }

  getToken() {
    return this._token();
  }
}
