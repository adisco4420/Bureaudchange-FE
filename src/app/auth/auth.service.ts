import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  register(payload) {
    return this.http.post(`${this.baseUrl}/user/register`, payload);
  }
}
