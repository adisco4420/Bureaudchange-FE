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
  allCurrency: CurrencyI[] = [];
  filteredCurreny = [];
  userWallets: CurrencyI[];
  constructor(
    private walletSrv: WalletService,
    private router: Router,
    private authSrv: AuthService,
    public gs: GeneralService) {
    this.token = this.gs.getToken;
    if (!this.token) {
      this.router.navigate(['/auth/login']);
    }
  }

  ngOnInit() {
    this.fetchCurrencys();
    this.getUserProfile();
  }
  getUserProfile() {
    this.authSrv.userProfile().pipe(takeUntil(this.unscribe)).subscribe((res: any) => {
      const token = this.gs.getSuccessData(res);
      const data = this.gs.decodeToken(token);
      this.userWallets = data && data.wallet ? data.wallet : [];
      this.currencyDiff([...this.userWallets]);
    });
  }
  fetchCurrencys() {
    this.allCurrency = this.walletSrv.getAllCurrency();
  }
  currencyDiff(userWallets: any[]) {
    const diff = [];
    for (const allcun of this.allCurrency) {
      if (!(userWallets.map(cun => cun.symbol).indexOf(allcun.symbol) >= 0)) {
        diff.push(allcun);
      }
    }
    this.filteredCurreny = diff;
  }
  addCurrency(currency) {
    this.walletSrv.walletSetup(currency).pipe(takeUntil(this.unscribe)).subscribe(res => {
      this.getUserProfile();
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
