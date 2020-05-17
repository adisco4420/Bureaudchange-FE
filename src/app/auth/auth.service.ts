import { env } from '../../environments/env';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from '../shared/general.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserI } from './components/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUserSubject: BehaviorSubject<UserI>;
  public currentUser: Observable<UserI>;
  mailLink = env.hostUrl;


  constructor(
    private http: HttpClient,
    private gs: GeneralService) {
      this.currentUserSubject = new BehaviorSubject<UserI>(this.gs.getCurrentUser);
      this.currentUser = this.currentUserSubject.asObservable();
    }

  register(payload) {
    return this.http.post(`${env.userApi}/register`, {...payload, baseUrl: this.mailLink});
  }
  login(payload) {
    return this.http.post(`${env.userApi}/login`, payload);
  }
  confirmEmail(token) {
    return this.http.get(`${env.userApi}/confirm-email`, this.gs.getAuthHeader(token));
  }
  resendConfirmEmail(email) {
    return this.http.post(`${env.userApi}/resend-email`, {email, baseUrl: this.mailLink});
  }
  userProfile() {
    return this.http.get(`${env.userApi}/profile`);
  }
  editProfile(payload) {
    return this.http.patch(`${env.userApi}/edit-profile`, payload);
  }
  userPinSetup(pin) {
    return this.http.patch(`${env.userApi}/pin-setup`, {pin});
  }
  public get currentUserValue(): Observable<UserI> {
    return this.currentUserSubject;
  }
  fetchWalletBalance() {
    return this.http.get(`${env.userApi}/wallet-balance`);
  }
  updateUserData(token) {
    this.currentUserSubject.next(this.gs.getCurrentUser);
    return this.gs.storeToken(token);
  }
  isUserLoggedIn() {
    if (this.gs.getToken) {
      return true;
    } else {
      return false;
    }
  }
  logout() {
    localStorage.removeItem(this.gs.currentUser);
    // this.currentUserSubject.next(null);
  }




}
