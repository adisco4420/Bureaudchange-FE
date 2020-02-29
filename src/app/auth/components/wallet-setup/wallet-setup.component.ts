import { AuthService } from './../../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GeneralService } from 'src/app/shared/general.service';
import { WalletService, CurrencyI } from 'src/app/shared/wallet.service';

@Component({
  selector: 'app-wallet-setup',
  templateUrl: './wallet-setup.component.html',
  styleUrls: ['./wallet-setup.component.css']
})
export class WalletSetupComponent implements OnInit, OnDestroy {
  unscribe = new Subject();
  token;
  showType: 'wallet'|'pin' =  'wallet';
  flag = {url: 'https://cdn.countryflags.com/thumbs/', size: '/flag-round-250.png'};
  allCurrency: CurrencyI[];
  constructor(
    private walletSrv: WalletService,
    private router: Router,
    private authSrv: AuthService,
    private gs: GeneralService) {
    this.token = this.gs.getToken;
    if (!this.token) {
      this.router.navigate(['/auth/login']);
    }
  }

  ngOnInit() {
    this.getUserProfile();
    this.fetchCurrencys();
  }
  getUserProfile() {
    this.authSrv.userProfile().pipe(takeUntil(this.unscribe)).subscribe(res => {
      console.log(res);
    });
  }
  fetchCurrencys() {
    setTimeout(() => {
      this.allCurrency = this.walletSrv.getAllCurrency();
    }, 3000);
  }
  addCurrency(currency) {
    this.walletSrv.walletSetup(currency).pipe(takeUntil(this.unscribe)).subscribe(res => {
      this.gs.swtSuccess(res);
    }, err => {
      this.gs.swtError(err);
    });
  }

  ngOnDestroy() {
    this.unscribe.next();
    this.unscribe.complete();
  }

}
