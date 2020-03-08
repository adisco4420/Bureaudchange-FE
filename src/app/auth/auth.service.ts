import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from '../shared/general.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserI } from './components/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userApi = `${environment.baseUrl}/user`;
  public currentUserSubject: BehaviorSubject<UserI>;
  public currentUser: Observable<UserI>;
  mailLink = environment.hostUrl;


  constructor(
    private http: HttpClient,
    private gs: GeneralService) {
      this.currentUserSubject = new BehaviorSubject<UserI>(this.gs.getCurrentUser);
      this.currentUser = this.currentUserSubject.asObservable();
    }

  register(payload) {
    return this.http.post(`${this.userApi}/register`, {...payload, baseUrl: this.mailLink});
  }
  login(payload) {
    return this.http.post(`${this.userApi}/login`, payload);
  }
  confirmEmail(token) {
    return this.http.get(`${'http://localhost:8080/user'}/confirm-email`, this.gs.getAuthHeader(token));
  }
  userProfile() {
    return this.http.get(`${this.userApi}/profile`);
  }
  userPinSetup(pin) {
    return this.http.patch(`${this.userApi}/pin-setup`, {pin});
  }
  public get currentUserValue(): Observable<UserI> {
    return this.currentUserSubject;
  }
  fetchWalletBalance() {
    return this.http.get(`${this.userApi}/wallet-balance`);
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
