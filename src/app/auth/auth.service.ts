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
  private currentUserSubject: BehaviorSubject<UserI>;
  public currentUser: Observable<UserI>;


  constructor(
    private http: HttpClient,
    private gs: GeneralService) {
      this.currentUserSubject = new BehaviorSubject<UserI>(this.gs.getCurrentUser);
      this.currentUser = this.currentUserSubject.asObservable();
    }

  register(payload) {
    return this.http.post(`${this.userApi}/register`, payload);
  }
  login(payload) {
    return this.http.post(`${this.userApi}/login`, payload);
  }
  confirmEmail(token) {
    return this.http.get(`${this.userApi}/comfirm-email`, this.gs.getAuthHeader(token));
  }
  userProfile() {
    return this.http.get(`${this.userApi}/profile`, this.gs.getAuthHeader());
  }
  userPinSetup(pin) {
    return this.http.patch(`${this.userApi}/pin-setup`, {pin}, this.gs.getAuthHeader());
  }
  public get currentUserValue(): UserI {
    return this.currentUserSubject.value;
  }
  logout() {
    localStorage.removeItem(this.gs.currentUser);
    this.currentUserSubject.next(null);
  }




}
