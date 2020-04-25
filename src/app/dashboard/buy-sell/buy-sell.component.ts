import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { WalletService } from 'src/app/shared/wallet.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/shared/general.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserI, UserWalletI } from 'src/app/auth/components/user.model';

@Component({
  selector: 'app-buy-sell',
  templateUrl: './buy-sell.component.html',
  styleUrls: ['./buy-sell.component.scss']
})
export class BuySellComponent implements OnInit, OnDestroy {
  private unscribe = new Subject();
  showPage: 'trans-detail' | 'buy-sell' | 'trans-summary' = 'buy-sell';
  currencyList: UserWalletI[];
  filteredCunList: UserWalletI[];
  transRate;
  loadingRate = false;
  exchangeLoading = false;
  errMsg = null;

  form = new FormGroup({
    transType: new FormControl('buy', Validators.required),
    recieve: new FormControl('', Validators.required),
    pay: new FormControl({value: '', disabled: true}, Validators.required),
    amount: new FormControl(1, [Validators.required, Validators.min(1)])
  });
  get formControl() {return this.form.controls; }
  constructor(
    private authSrv: AuthService,
    private gs: GeneralService,
    private walletSrv: WalletService) { }

  ngOnInit() {
    this.fetchWallet();
  }

  fetchWallet() {
    this.authSrv.fetchWalletBalance().pipe(takeUntil(this.unscribe))
    .subscribe((res: UserI) => {
      const data = this.gs.getSuccessData(res);
      this.currencyList = data && data.wallet ? data.wallet : [];
    });
  }
  filteredCun() {
    const recieveForm = this.form.controls.recieve;
    const payForm = this.form.controls.pay;
    if (recieveForm.valid) {
      payForm.enable();
      payForm.setValue('');
      this.filteredCunList = this. currencyList.filter(cun => cun.symbol !== recieveForm.value);
    }
  }
  getCunDetail(symbol: string): UserWalletI {
    return this.currencyList.find(cun => cun.symbol === symbol);
  }
  next() {
    this.loadingRate = true;
    this.getCunRate();
  }
  goBack() {
    this.form.controls.amount.setValue(1);
    this.errMsg = null;
    this.toggelView('buy-sell');
  }
  getCunRate() {
    this.walletSrv.fetchCunRate(this.form.value.pay).pipe(takeUntil(this.unscribe))
      .subscribe((res) => {
        const data = this.gs.getSuccessData(res);
        const currency = data.rates.find(rate => rate.currency === this.form.value.recieve);
        this.transRate = currency.rate;
        this.toggelView('trans-detail');
      }).add(() => {
        this.loadingRate = false;
      });
  }
  get TransFee() {
    const amount = this.form.value.amount;
    return (1 / 100 * amount).toFixed(2);
  }
  get totalAmount() {
    const amount = this.form.value.amount;
    return Number(this.TransFee) + Number(amount);
  }
  toggelView(page) {
    this.showPage = page;
  }
  proceed() {
    if (this.form.valid) {
      this.exchangeLoading = true;
      this.errMsg = null;
      this.walletSrv.exchangeCurrency(this.form.value).pipe(takeUntil(this.unscribe))
        .subscribe(res => {
          const data = this.gs.getSuccessData(res);
          this.toggelView('trans-summary');
          console.log(data);
        }, err => {
          this.errMsg = err.error;
        }).add(() => {
          this.exchangeLoading = false;
        });
    }
  }


  ngOnDestroy() {
    this.unscribe.next();
    this.unscribe.complete();
  }

}
