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
  }

}
