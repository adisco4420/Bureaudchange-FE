import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { UserWalletI, UserI } from 'src/app/auth/components/user.model';
import { GeneralService } from 'src/app/shared/general.service';
import { environment } from 'src/environments/environment';
import { WalletService } from 'src/app/shared/wallet.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

declare const Stripe;

@Component({
  selector: 'app-fund-wallet',
  templateUrl: './fund-wallet.component.html',
  styleUrls: ['./fund-wallet.component.scss']
})
export class FundWalletComponent implements OnInit, OnDestroy {
  private unscribe = new Subject();
  form: FormGroup;
  currencyList: UserWalletI[];
  disBtn = false;
  paymentType =  [
  { name: 'Fund with card', value: 'card', icon: 'fa fa-credit-card'},
  { name: 'Fund with paypal', value: 'paypal', icon: 'fa fa-cc-paypal'}
];
  stripe;
  formError = false;
  constructor(
    fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private gs: GeneralService,
    private authSrv: AuthService,
    private walletSrv: WalletService) {
      this.stripe = Stripe(environment.stripeTestKey);
      this.authSrv.fetchWalletBalance().subscribe((res: UserI) => {
        const data = this.gs.getSuccessData(res);
        this.currencyList = data && data.wallet ? data.wallet : [];
      });
      this.form = fb.group({
        amount: [ '', Validators.required],
        fundType: [ '', Validators.required],
        currency: ['', Validators.required]
      });
      this.getRedirect();
  }
  ngOnInit() {
  }
  fundWallet() {
    if (this.form.valid) {
      this.disBtn = true;
      this.getStripeSesId();
    } else {
      this.formError = true;
    }
  }
  loadStripe(sessionId) {
    this.stripe.redirectToCheckout({
      sessionId
    }).then((result) => {
      console.log(result);
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }).catch(err => {
      console.log(err);
    });
  }
  getStripeSesId() {
    const url = environment.hostUrl;
    const selectedCurrency = this.currencyList.find(cun => cun.symbol === this.form.value.currency);
    const payload = {
      amount: this.form.value.amount,
      currency: this.form.value.currency,
      success_url: `${url}/fund-wallet`,
      cancel_url: `${url}/fund-wallet?cancel=true`,
      name: selectedCurrency.name
    };
    this.walletSrv.fetchStripeSesId(payload).pipe(takeUntil(this.unscribe)).subscribe(res => {
      const session = this.gs.getSuccessData(res);
      this.loadStripe(session.id);
    }, err => {
      console.log(err);
    }).add(() => {
      this.disBtn = false;
    });
  }
  getRedirect() {
    this.route.queryParams.subscribe(params => {
      if (params.cancel) {
        this.gs.swtWarning('Fund Wallet operating was cancelled');
        this.router.navigate(['/fund-wallet']);
      }
      if (params.session_id) {
        this.gs.swtSuccess('Wallet Fund Successful').then(res => {
          if (res.value) {
            this.router.navigate(['/dashboard']);
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.unscribe.next();
    this.unscribe.complete();
  }
}
