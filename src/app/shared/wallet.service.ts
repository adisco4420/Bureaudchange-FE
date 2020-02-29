import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
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
  userApi = `${environment.baseUrl}/user`;
  constructor(
    private http: HttpClient,
    private gs: GeneralService) { }

  walletSetup({name, symbol, sign}) {
    const payload = {name, symbol, sign};
    return this.http.patch(`${this.userApi}/wallet-setup`, payload, this.gs.getAuthHeader());
  }

  getAllCurrency(): CurrencyI[] {
    return [
      { name: 'British Pound', symbol: 'GBP', sign: '£', flagName: 'united-kingdom'},
      { name: 'US Dollar', symbol: 'USD', sign: '$', flagName: 'united-states-of-america'},
      { name: 'European Euro', symbol: 'EUR', sign: '€', flagName: 'canada'},
      { name: 'Nigerian Naira', symbol: 'NGN', sign: '₦', flagName: 'nigeria'},
      { name: 'UAE Dirham', symbol: 'AED', sign: '	د.إ', flagName: 'united-arab-emirates'},
      { name: 'Chinese Yuan', symbol: 'CNY', sign: '¥', flagName: 'china'},
      { name: 'Ghanian Cedi', symbol: 'GHS', sign: '₵', flagName: 'ghana'},
    ];
  }
}
