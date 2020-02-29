import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export interface CurrencyI {
  name: string;
  symbol: string;
  sign: string;
  flagName: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userApi = `${environment.baseUrl}/user`;
  currentUser = 'currentUser';
  constructor(private http: HttpClient) { }

  register(payload) {
    return this.http.post(`${this.userApi}/register`, payload);
  }
  confirmEmail(token) {
    return this.http.get(`${this.userApi}/comfirm-email`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  storeToken(token: string) {
    localStorage.setItem(this.currentUser, token);
  }
  getToken() {
    return localStorage.getItem(this.currentUser);
  }
  getAllCurrency(): CurrencyI[] {
    return [
      { name: 'British Pound', symbol: 'GBP', sign: '£', flagName: 'united-kingdom'},
      { name: 'US Dollar', symbol: 'USD', sign: '$', flagName: 'united-states-of-america'},
      { name: 'European Euro', symbol: 'EUR', sign: '€', flagName: 'canada'},
      { name: 'Nigerian Naira', symbol: 'NGN', sign: '₦', flagName: 'nigeria'},
      { name: 'UAE Dirham', symbol: 'AED', sign: '	د.إ', flagName: 'united-arab-emirates'},
      { name: 'Chinese Yuan', symbol: 'CNY', sign: '¥', flagName: 'china'},
      { name: 'Ghanian Cedi', symbol: 'GHS', sign: '₵', flagName: 'ghana'},
    ];
  }
}
