import { env } from './../../../../environments/env';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cdn = env.clodinaryUrl;
  stepList = [
    {icon: 'reg_ywg43d.png', title: '1. Register for free.'},
    {icon: 'verify-email_db8y3l.png', title: '2. Verify email address.'},
    {icon: 'wallet_brlhte.png', title: '3. Setup Wallet.'},
    {icon: 'fund-wallet_u0ocjc.png', title: '4. Fund your wallet.'},
    {icon: 'currency-exchange_qk5tph.png', title: '5. Exchange to preffered currencies.'},
    {icon: 'bank-transfer_zpfvpm.png', title: '6. Withdraw to  bank account.'},
 ];
 features = [
   {icon: 'fee_b7pnty.png', title: 'Low transaction fee', text: 'You pay low fee on every successful transactions, There are no hidden fees'},
   {icon: 'setup_hji2k3.png', title: 'Easy setup', text: 'No paper work required to get started, with just few steps you can start exchanging your currencies easily.'},
   {icon: 'secure_x0ricm.png', title: 'Safe and secure', text: 'Our platform provides top notch security measure on every activities carried out.'},
   {icon: 'swift_nphbib.png', title: 'Fast and convenient', text: 'Enjoy the quickest and most convenient online foreign exchange transactions.'},
   {icon: 'support_xnnob9.png', title: 'Reliable customer support', text: 'Our customer support channel are always available 24/7.'},
   {icon: 'chargeback_vg155u.png', title: 'No chargebacks', text: 'Chargeback is a thing of the past, you are 100% protected against fraud.'}



 ];
  appName = environment.appName;
  constructor() { }

  ngOnInit() {
  }

}
