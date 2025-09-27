import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5044/api/User'; // Backend UserController
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

  loginApi(credentials: {
    Username: string;
    Password: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/Login`, credentials);
  }

  getRoles(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:5044/api/Role/GetRoles');
  }

  registerApi(userData: {
    Username: string;
    Email: string;
    Password: string;
    Phone: string;
    RoleName: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/Register`, userData);
  }

  saveAuth(tokenOrUser: string, role: string) {
    this._token.set(tokenOrUser);
    this._role.set(role);
    this._isLoggedIn.set(true);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', tokenOrUser);
      localStorage.setItem('role', role);
    }
  }

  logout() {
    this._token.set(null);
    this._role.set(null);
    this._isLoggedIn.set(false);

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
