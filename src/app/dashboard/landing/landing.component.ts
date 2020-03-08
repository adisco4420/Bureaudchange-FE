import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserWalletI } from 'src/app/auth/components/user.model';
import { GeneralService } from 'src/app/shared/general.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  unscribe = new Subject();
  walletList: UserWalletI[];
  constructor(
    private authSrv: AuthService,
    public gs: GeneralService,
    private toastr: ToastrService,
    private router: Router) {}
  ngOnInit() {
    this.getUserProfile();
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
  addCurrency() {
    this.router.navigate(['/auth/wallet-setup'], {queryParams: {addCurrency: 'true'}});
  }

  ngOnDestroy() {
    this.unscribe.next();
    this.unscribe.complete();
  }

}
