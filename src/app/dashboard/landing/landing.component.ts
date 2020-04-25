import { TransI } from './../../models/trans.model';
import { WalletService } from 'src/app/shared/wallet.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserWalletI } from 'src/app/auth/components/user.model';
import { GeneralService } from 'src/app/shared/general.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import TransUtils from '../../utilts/trans.utilts';
import CurrencyUtil from '../../utilts/currency.util';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  transUtil = TransUtils;
  cunbySymbol = CurrencyUtil.getCunBySymbol;
  unscribe = new Subject();
  walletList: UserWalletI[];
  transList: TransI[];
  constructor(
    private authSrv: AuthService,
    public gs: GeneralService,
    private toastr: ToastrService,
    private walletSrv: WalletService,
    private router: Router) {}
  ngOnInit() {
    this.getUserProfile();
    this.getTrans();
  }

  getUserProfile() {
    this.authSrv.fetchWalletBalance().pipe(takeUntil(this.unscribe)).subscribe((res: any) => {
      const data = this.gs.getSuccessData(res);
      this.walletList = data && data.wallet ? data.wallet : [];
      if (this.walletList.length <= 1) {
        this.toastr.warning('Setup Wallet');
        this.router.navigate(['/auth/wallet-setup']);
      }
    });
  }
  getTrans() {
    this.walletSrv.fetchTrans().pipe(takeUntil(this.unscribe)).subscribe(res => {
      const data = this.gs.getSuccessData(res);
      this.transList = data.splice(0, 5);
    });
  }
  addCurrency() {
    this.router.navigate(['/auth/wallet-setup'], {queryParams: {addCurrency: 'true'}});
  }

  ngOnDestroy() {
    this.unscribe.next();
    this.unscribe.complete();
  }

}
