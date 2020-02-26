import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  swtSuccess(res) {
    return Swal.fire({
      title: 'Success',
      text: res && res.data && res.data.msg ? res.data.msg : 'Successful',
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
}
