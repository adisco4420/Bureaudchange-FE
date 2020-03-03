import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import jwtDecode from 'jwt-decode';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UserI } from '../auth/components/user.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  currentUser = 'currentUser';
  constructor() { }

  swtSuccess(res) {
    return Swal.fire({
      title: 'Success',
      text: this.getSucessMsg(res),
      icon: 'success',
      confirmButtonText: 'Ok'
    });
  }
  swtError(error) {
    return Swal.fire({
      title: 'Failed',
      text: error.error || 'Error',
      icon: 'error',
      confirmButtonText: 'Ok'
    });
  }
  getError(error: HttpErrorResponse): {status: number, error: string} {
    const newError =  error && error.error && error.error.data
    && error.error.data.msg ? error.error.data.msg :
    'Error occured try again';
    const result = {status: error.status, error: newError};
    return result;
  }
  getSucessMsg(data) {
    return data && data.data && data.data.msg ? data.data.msg : 'Successful';
  }
  getSuccessData(data) {
    return data && data.data && data.data.data ? data.data.data : [];
  }
  get getToken() {
    return JSON.parse(localStorage.getItem(this.currentUser));
  }
  get getCurrentUser(): UserI {
    let user = null;
    if (this.getToken) {
      user = this.decodeToken(this.getToken);
    }
    return user;
  }
  getAuthHeader(token?): {headers: HttpHeaders} {
    const httpOptions = {
      headers : new HttpHeaders({
        Authorization: `Bearer ${token || this.getToken}`
      })
    };
    return httpOptions;
  }
  storeToken(token: string) {
    localStorage.setItem(this.currentUser, JSON.stringify(token));
  }
  decodeToken(token) {
    return jwtDecode(token);
  }
  getCurrencyColor(symbol): {bg: string, icon: string, class: string} {
    let result = {bg: '#28a745', icon: 'green', class: 'd'};
    switch (symbol) {
      case 'USD':
        result = {bg: '#ff00b3', icon: '#e22d69', class: 'd'};
        break;
      case 'GBP':
        result = {bg: '#ff0055', icon: '#cc0044', class: 't'};
        break;
      case 'EUR':
        result = {bg: '#007bff', icon: '#4336FB', class: 'e'};
        break;
      case 'AED':
        result = {bg: '#00cccc', icon: '#009999', class: 't'};
        break;
      case 'CNY':
        result = {bg: '#c6538c', icon: '#993366', class: 'l'};
        break;
      case 'GHS':
        result = {bg: '#ff5500', icon: '#b33c00', class: 'b'};
        break;
      default:
        break;
    }

    return result;
  }
  getContryFlagName(symbol: string) {
    let flagName = 'nigeria';
    switch (symbol) {
      case 'USD':
        flagName = 'united-states-of-america';
        break;
      case 'GBP':
          flagName = 'united-kingdom';
          break;
      case 'EUR':
        flagName = 'canada';
        break;
      case 'AED':
          flagName = 'united-arab-emirates';
          break;
      case 'CNY':
          flagName = 'china';
          break;
      case 'GHS':
            flagName = 'ghana';
            break;
      default:
        break;
    }
    return flagName;
  }

}
