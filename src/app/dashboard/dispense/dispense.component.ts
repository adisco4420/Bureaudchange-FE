import { WalletService } from 'src/app/shared/wallet.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/shared/general.service';
import { UserBankActI, UserWalletI } from 'src/app/auth/components/user.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersBankService } from '../services/users-bank.service';
import WalletUtil from '../../utilts/wallet.util';
@Component({
  selector: 'app-dispense',
  templateUrl: './dispense.component.html',
  styleUrls: ['./dispense.component.scss']
})
export class DispenseComponent implements OnInit, OnDestroy {
  page: 'withdraw'| 'confirm'|'trans-summary' = "withdraw";
  errMsg: string;
  private unscribe = new Subject();
  validateLoading = false;
  bankList: UserBankActI[];
  selectCurrency: UserWalletI;
  selectedBank: UserBankActI;

  withdrawForm = new FormGroup({
    currency: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    pin: new FormControl('', [Validators.required]),
  });
  constructor(
    private userBankSrv: UsersBankService,
    private walletSrv: WalletService,
    private gs: GeneralService) {
      (this.selectCurrency as any) = {};
     }

  ngOnInit() {
    this.getBanks();
  }
  getControl(field) {
    return this.withdrawForm.controls[field];
  }
  getBanks() {
    this.userBankSrv.fetchBanks().pipe(takeUntil(this.unscribe))
      .subscribe(res => {
        const data = this.gs.getSuccessData(res);
        this.bankList = data && data.bankAccounts ? data.bankAccounts : [];
    });
  }
  getSelectedBank() {
    this.selectedBank = this.bankList.find(bankx => bankx.currency === this.selectCurrency.symbol);
  }
  changeBank() {
    const currency = this.withdrawForm.value.currency;
    if (currency) {
      this.selectCurrency = this.errMsg  = null;
      this.getControl('amount').setValue('');
      this.walletSrv.fetchWalletDetails(currency).pipe(takeUntil(this.unscribe))
        .subscribe(res => this.selectCurrency = this.gs.getSuccessData(res));
    }
  }
  get getTransFee() {
    const { amount, currency } = this.withdrawForm.value;
    const fee = amount && currency ? WalletUtil.WithdrawRate({amount, currency}) : 0;
    return fee;
  }
  get validPin() {
    const value = this.getControl('pin').value + '';
    return value.length === 5;
  }
  validateAmount() {
    const { amount, currency } = this.withdrawForm.value;
    if (amount && currency) {
      this.validateLoading = true;
      this.errMsg = null;
      const payload = {amount, currency, type: "withdraw"};
      this.walletSrv.validateTransCunAmount(payload).pipe(takeUntil(this.unscribe))
        .subscribe(res => {
          if ((Number(this.getTransFee + amount) <= this.selectCurrency.balance) ) {
            this.page = 'confirm';
            this.getSelectedBank();
          } else {
            this.errMsg = 'Insufficient Fund';
          }
        }, err => {
          this.errMsg = err.error;
        }).add(() => {
          this.validateLoading = false;
        });
    }
  }
  withdraw() {
    if (this.withdrawForm.valid)  {
      this.validateLoading = true;
      this.errMsg = null;
      this.walletSrv.withdraw(this.withdrawForm.value).pipe(takeUntil(this.unscribe))
        .subscribe(res => {
          this.page = 'trans-summary';
        }, err => {
          this.errMsg = err.error;
        }).add(() => {
          this.validateLoading = false;
        });
    }
  }

  ngOnDestroy() {
    this.unscribe.next();
    this.unscribe.complete();
  }

}
