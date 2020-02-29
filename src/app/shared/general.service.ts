import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import jwtDecode from 'jwt-decode';
import { HttpHeaders } from '@angular/common/http';

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
      text: this.getError(error) || 'Error',
      icon: 'error',
      confirmButtonText: 'Ok'
    });
  }
  getError(error) {
    return error && error.error && error.error.data && error.error.data.msg ? error.error.data.msg : 'Error occured try again';
  }
  getSucessMsg(data) {
    return data && data.data && data.data.msg ? data.data.msg : 'Successful';
  }
  getSuccessData(data) { 
    return data && data.data && data.data.data ? data.data.data : [];
  }
  get getToken() {
    return localStorage.getItem(this.currentUser);
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
    localStorage.setItem(this.currentUser, token);
  }
  decodeToken(token) {
    return jwtDecode(token);
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
