import { env } from 'src/environments/env';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersBankService {
  constructor(private http: HttpClient) { }

  addBank(payload) {
    return this.http.post(`${env.usersBankApi}/add`, payload);
  }
  fetchBanks() {
    return this.http.get(`${env.usersBankApi}/all`);
  }
  editBank(payload) {
    return this.http.patch(`${env.usersBankApi}/update`, payload);
  }
  deleteBank(currency: string) {
    return this.http.delete(`${env.usersBankApi}/delete/${currency}`);
  }

}
