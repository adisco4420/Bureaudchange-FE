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

declare let Stripe;
declare const getpaidSetup;

@Component({
  selector: 'app-fund-wallet',
  templateUrl: './fund-wallet.component.html',
  styleUrls: ['./fund-wallet.component.scss']
})
export class FundWalletComponent implements OnInit, OnDestroy {
  private unscribe = new Subject();
  user: UserI;
  form: FormGroup;
  currencyList: UserWalletI[];
  disBtn = false;
  paymentType =  [
  { name: 'debit card', value: 'card', icon: 'fa fa-credit-card'},
  { name: 'bank transfer', value: 'bank-transfer', icon: 'fa fa-bank'}
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
      this.authSrv.fetchWalletBalance().subscribe((res: UserI) => {
        if ((window as any).Stripe) {
          this.stripe = Stripe(environment.stripeTestKey);
        }
        const data = this.gs.getSuccessData(res);
        this.currencyList = data && data.wallet ? data.wallet : [];
      });
      this.form = fb.group({
        amount: [ '', Validators.required],
        fundType: [ '', Validators.required],
        currency: ['', Validators.required]
      });
      this.user = this.gs.getCurrentUser;
      this.getRedirect();
  }
  ngOnInit() {}
  fundWallet() {
    if (this.form.valid) {
      this.disBtn = true;
      if (this.form.value.currency === 'NGN') {
        this.payWithRave();
      } else {
        this.getStripeSesId();
      }
    } else {
      this.formError = true;
    }
  }
  loadStripe(sessionId) {
    this.stripe.redirectToCheckout({
      sessionId
    }).then((result) => {
      console.log(result);
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
      let errMsg = err.error;
      if (err.error && err.error.includes('currencyconverterapi')) {
        errMsg = 'Please try again later error occured from currency api';
      }
      this.gs.swtWarning(errMsg);
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

  payWithRave() {
      const x = getpaidSetup({
          PBFPubKey:  environment.flutterwaveTestKey,
          customer_email: this.user.email,
          amount: this.form.value.amount,
          customer_phone: this.user.phoneNumber,
          currency: "NGN",
          txref: "rave-123456",
          meta: [{
              metaname: "flightID",
              metavalue: "AP1234"
          }],
          onclose: () => {
              // this.gs.swtWarning('Fund Wallet operating was cancelled');
          },
          callback: (response) => {
              const txref = response.data.txRef; // collect txRef returned and pass to a server page to complete status check.
              console.log("This is the response returned after a charge", response);
              if (
                  response.respcode === "00" ||
                  response.respcode === "0"
              ) {
                // redirect to a success page
                this.gs.swtSuccess('Wallet Fund Successful').then(res => {
                  if (res.value) {
                    this.router.navigate(['/dashboard']);
                  }
                });
              } else {
                // redirect to a failure page.
                this.gs.swtError({error: 'Error occured when trying to Fund Wallet'});
              }
              this.disBtn = false;

              x.close(); // use this to close the modal immediately after payment.
          }
      });
  }
  ngOnDestroy() {
    this.unscribe.next();
    this.unscribe.complete();
  }
}
