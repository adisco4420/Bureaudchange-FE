import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from 'src/environments/env';
import { GeneralService } from './general.service';

export interface CurrencyI {
  name: string;
  symbol: string;
  sign: string;
  flagName: string;
}
@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(
    private http: HttpClient,
    private gs: GeneralService) { }

  walletSetup({name, symbol, sign}) {
    const payload = {name, symbol, sign};
    return this.http.patch(`${env.userApi}/wallet-setup`, payload, this.gs.getAuthHeader());
  }
  fetchStripeSesId(payload) {
    return this.http.post(env.fundWalletApi + '/get-stripe-session-id', payload);
  }

  fetchCunRate(currencySymbol: string) {
    return this.http.get(`${env.cunRateApi}/get/${currencySymbol}`);
  }
  exchangeCurrency(payload) {
    const body = {
      amount: payload.amount,
      payCun: payload.pay,
      recieveCun: payload.recieve,
    };
    return this.http.post(`${env.userApi}/exchange`, body);
  }
  fetchWalletDetails(currency: string) {
    return this.http.get(`${env.userApi}/wallet-details/${currency}`);
  }
  validateTransCunAmount(payload: {currency: string, amount: number, type: string}) {
    return this.http.post(`${env.userApi}/validate-trans-cun-amount`, payload);
  }
  withdraw(payload) {
    const body = {
      amount: payload.amount,
      recieveCun: payload.currency,
      pin: payload.pin
    };
    return this.http.post(`${env.userApi}/withdraw`, body);
  }
  fetchTrans() {
    return this.http.get(`${env.transApi}/user`);
  }
  getAllCurrency(): CurrencyI[] {
    return [
      { name: 'British Pound', symbol: 'GBP', sign: '£', flagName: 'united-kingdom'},
      { name: 'US Dollar', symbol: 'USD', sign: '$', flagName: 'united-states-of-america'},
      { name: 'European Euro', symbol: 'EUR', sign: '€', flagName: 'european-union'},
      { name: 'Nigerian Naira', symbol: 'NGN', sign: '₦', flagName: 'nigeria'},
      { name: 'UAE Dirham', symbol: 'AED', sign: '	د.إ', flagName: 'united-arab-emirates'},
      { name: 'Chinese Yuan', symbol: 'CNY', sign: '¥', flagName: 'china'},
      // { name: 'Ghanian Cedi', symbol: 'GHS', sign: '₵', flagName: 'ghana'},
    ];
  }

}
