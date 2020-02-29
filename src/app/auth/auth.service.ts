import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from '../shared/general.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userApi = `${environment.baseUrl}/user`;
  constructor(
    private http: HttpClient,
    private gs: GeneralService) { }

  register(payload) {
    return this.http.post(`${this.userApi}/register`, payload);
  }
  confirmEmail(token) {
    return this.http.get(`${this.userApi}/comfirm-email`, this.gs.getAuthHeader(token));
  }
  userProfile() {
    return this.http.get(`${this.userApi}/profile`, this.gs.getAuthHeader());
  }



}
