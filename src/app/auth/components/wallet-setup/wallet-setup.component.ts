import { AuthService } from './../../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GeneralService } from 'src/app/shared/general.service';
import { WalletService, CurrencyI } from 'src/app/shared/wallet.service';
import { ToastrService } from 'ngx-toastr';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-wallet-setup',
  templateUrl: './wallet-setup.component.html',
  styleUrls: ['./wallet-setup.component.scss']
})
export class WalletSetupComponent implements OnInit, OnDestroy {
  unscribe = new Subject();
  token;
  loading = '';
  loadingPin = false;
  showType: 'wallet'|'pin' =  'wallet';
  flag = {url: 'https://cdn.countryflags.com/thumbs/', size: '/flag-round-250.png'};
  allCurrency: CurrencyI[] = [];
  filteredCurreny = [];
  userWallets: CurrencyI[];
  minimumCurrencyError = false;
  pinError = false;
  isAddCurrncy = false;
  constructor(
    private walletSrv: WalletService,
    private router: Router,
    private route: ActivatedRoute,
    private authSrv: AuthService,
    private toastr: ToastrService,
    public gs: GeneralService) {
    this.token = this.gs.getToken;
    if (!this.token) {
      this.router.navigate(['/auth/login']);
    }
    this.route.queryParams.subscribe(res => {
      this.isAddCurrncy =  res && res.addCurrency ? true : false;
    });
  }

  ngOnInit() {
    this.fetchCurrencys();
    this.getUserProfile();
  }
  getUserProfile() {
    this.authSrv.userProfile().pipe(takeUntil(this.unscribe)).subscribe((res: any) => {
      const token = this.gs.getSuccessData(res);
      const data = this.gs.decodeToken(token);
      this.authSrv.updateUserData(token);
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
    this.loading = currency.symbol;
    this.walletSrv.walletSetup(currency).pipe(takeUntil(this.unscribe)).subscribe(res => {
      this.getUserProfile();
      this.toastr.success(`${currency.name} Added To Wallet`);
    }, err => {
      this.gs.swtError(err);
    });
  }
  showPinSetup() {
    if (this.userWallets.length >= 2) {
      this.showType = 'pin';
      this.minimumCurrencyError = false;
    } else {
      this.minimumCurrencyError = true;
    }
  }
  pinSetup(pin: NgModel) {
    if (pin.valid && `${pin.value}`.length === 5) {
      this.pinError = false;
      this.loadingPin = true;
      this.authSrv.userPinSetup(`${pin.value}`).pipe(takeUntil(this.unscribe)).subscribe(res => {
        this.toastr.success('Pin Setup Successful');
        this.router.navigate(['/dashboard']);
      }, err => {
        this.gs.swtError(err);
      }).add(() => {
        this.loadingPin = false;
      });
    } else {
      this.pinError = true;
    }
  }
  gotoDashboard() {
    this.router.navigate(['/dashboard']);
  }

  ngOnDestroy() {
    this.unscribe.next();
    this.unscribe.complete();
  }

}
