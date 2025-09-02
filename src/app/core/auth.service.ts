import { Injectable, signal, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = signal<boolean>(false);
  private _token = signal<string | null>(null);
  private _role = signal<string | null>(null);

  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedToken = localStorage.getItem('token');
      const savedRole = localStorage.getItem('role');
      if (savedToken) this._token.set(savedToken);
      if (savedRole) this._role.set(savedRole);
      if (savedToken) this._isLoggedIn.set(true);
    }
  }

  login(token: string, role: string) {
    this._token.set(token);
    this._isLoggedIn.set(true);
    this._role.set(role);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
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
