import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userApi = `${environment.baseUrl}/user`;
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
}
