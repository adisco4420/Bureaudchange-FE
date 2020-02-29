import { AuthService, CurrencyI } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet-setup',
  templateUrl: './wallet-setup.component.html',
  styleUrls: ['./wallet-setup.component.css']
})
export class WalletSetupComponent implements OnInit {
  token;
  showType: 'wallet'|'pin' =  'wallet';
  flag = {url: 'https://cdn.countryflags.com/thumbs/', size: '/flag-round-250.png'};
  allCurrency: CurrencyI[];
  constructor(
    private authSrv: AuthService,
    private router: Router) {
    this.token = this.authSrv.getToken();
    if (!this.token) {
      this.router.navigate(['/auth/login']);
    }
  }

  ngOnInit() {
    this.fetchCurrencys();
  }
  fetchCurrencys() {
    setTimeout(() => {
      this.allCurrency = this.authSrv.getAllCurrency();
    }, 3000);
  }
  addCurrency(currency) {
    console.log(currency);
    
  }

}
