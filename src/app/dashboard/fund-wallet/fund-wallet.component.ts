import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { UserWalletI, UserI } from 'src/app/auth/components/user.model';
import { GeneralService } from 'src/app/shared/general.service';

@Component({
  selector: 'app-fund-wallet',
  templateUrl: './fund-wallet.component.html',
  styleUrls: ['./fund-wallet.component.scss']
})
export class FundWalletComponent implements OnInit {
  form: FormGroup;
  currencyList: UserWalletI[];
  paymentType =  [
  { name: 'Fund with card', value: 'card', icon: 'fa fa-credit-card'},
  { name: 'Fund with paypal', value: 'paypal', icon: 'fa fa-cc-paypal'}
];
  constructor(
    fb: FormBuilder,
    private gs: GeneralService,
    private authSrv: AuthService) {
      this.authSrv.userProfile().subscribe((res: UserI) => {
        const token = this.gs.getSuccessData(res);
        const data = this.gs.decodeToken(token);
        this.currencyList = data && data.wallet ? data.wallet : [];
      });
      this.form = fb.group({
        amount: [ '', Validators.required],
        fundType: [ '', Validators.required],
        currency: ['', Validators.required]
      });
  }
  ngOnInit() {
    this.loadStripe();
  }
  fundWallet() {
    this.stripePay(40);
    console.log(this.form.value);
  }
  loadStripe() {
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            alert('Payment Success!!');
          }
        });
      }

      window.document.body.appendChild(s);
    }
  }
  stripePay(amount: number) {
    const handler = (window as any).StripeCheckout.configure({
      key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
      locale: 'auto',
      token: (token: any) => {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token);
        alert('Token Created!!');
      }
    });
    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: amount * 100
    });
  }
}
