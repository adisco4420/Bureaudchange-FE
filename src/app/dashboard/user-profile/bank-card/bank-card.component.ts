import { AuthService } from 'src/app/auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GeneralService } from 'src/app/shared/general.service';
import { UsersBankService } from './../../services/users-bank.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserI, UserBankActI } from 'src/app/auth/components/user.model';

@Component({
  selector: 'app-bank-card',
  templateUrl: './bank-card.component.html',
  styleUrls: ['./bank-card.component.scss']
})
export class BankCardComponent implements OnInit, OnDestroy {
  private unscribe = new Subject();
  currencyList: any[];
  bankList: UserBankActI[];
  loading = false;
  actionType: 'edit' | 'add';
  bankForm = new FormGroup({
    currency: new FormControl('', Validators.required),
    bankName: new FormControl('', Validators.required),
    accountNo: new FormControl('', Validators.required),
    accountName: new FormControl('', Validators.required)
  });
  constructor(
    private usersBankSrv: UsersBankService,
    private authSrv: AuthService,
    public gs: GeneralService) { }

  ngOnInit() {
    this.fetchCurrenies();
    this.getAllUserBank();
  }
  fetchCurrenies() {
    this.authSrv.fetchWalletBalance().subscribe((res: UserI) => {
      const data = this.gs.getSuccessData(res);
      this.currencyList = data && data.wallet ? data.wallet : [];
    });
  }
  getAllUserBank() {
    this.usersBankSrv.fetchBanks().pipe(takeUntil(this.unscribe))
      .subscribe((res: UserI) => {
        const data = this.gs.getSuccessData(res);
        this.bankList = data && data.bankAccounts ? data.bankAccounts : [];
      });
  }
  getControl(feild) {
    return this.bankForm.controls[feild];
  }
  addBank() {
    this.bankForm.reset();
    this.getControl('currency').setValue('');
    this.openBankModal('add');
  }
  openBankModal(actionType: 'add'| 'edit') {
    this.actionType = actionType;
    document.getElementById('openBankModalBtn').click();
  }
  addEditBank() {
    if (this.bankForm.valid) {
      const action = `${this.actionType}Bank`;
      this.loading = true;
      this.usersBankSrv[action](this.bankForm.value).pipe(takeUntil(this.unscribe))
        .subscribe(res => {
          this.getAllUserBank();
          this.gs.swtSuccess(res);
        }, err => {
          this.gs.swtError(err);
        }).add(() => {
          document.getElementById('closeBankModal').click();
          this.loading = false;
        });
    }
  }
  editBank(details) {
    this.bankForm.patchValue(details);
    this.openBankModal('edit');
  }
  deletebank(detail: UserBankActI) {
    if (detail) {
      const observable = this.usersBankSrv.deleteBank(detail.currency);
      const msg = `<h5>Delete ${detail.bankName}</h5>`;
      this.gs.sweetAlertAsync('warning', msg, observable)
          .then(res => {
            if (res.value && res.value.status) {
              if (res.value.status === 'success') {
                this.getAllUserBank();
                this.gs.swtSuccess(res.value);
              } else {
                this.gs.swtError(res.value);
              }
            }
          });
    }
  }

  ngOnDestroy() {
    this.unscribe.next();
    this.unscribe.complete();
  }

}
