import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
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
      text: this.getData(res),
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
  getData(data) {
    return data && data.data && data.data.msg ? data.data.msg : 'Successful';
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

}
