import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = signal<boolean>(false);
  private _token = signal<string | null>(null);

  constructor() {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      this._token.set(savedToken);
      this._isLoggedIn.set(true);
    }
  }

  login(token: string) {
    this._token.set(token);
    this._isLoggedIn.set(true);
    localStorage.setItem('token', token);
  }

  logout() {
    this._token.set(null);
    this._isLoggedIn.set(false);
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return this._isLoggedIn();
  }

  getToken() {
    return this._token();
  }
}
