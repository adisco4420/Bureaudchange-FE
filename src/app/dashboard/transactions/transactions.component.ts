import { GeneralService } from 'src/app/shared/general.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { WalletService } from 'src/app/shared/wallet.service';
import { TransI } from './../../models/trans.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import TransUtils from '../../utilts/trans.utilts';
import CurrencyUtil from '../../utilts/currency.util';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, OnDestroy {
  private unscribe = new Subject();
  p = 1;
  transUtil = TransUtils;
  cunbySymbol = CurrencyUtil.getCunBySymbol;
  transList: TransI[];
  constructor(
    private walletSrv: WalletService,
    private gs: GeneralService) { }

  ngOnInit() {
    this.getTrans();
  }

  getTrans() {
    this.walletSrv.fetchTrans().pipe(takeUntil(this.unscribe))
      .subscribe(res => {
        this.transList = this.gs.getSuccessData(res);
      });
  }
  ngOnDestroy() {
    this.unscribe.next();
    this.unscribe.complete();
  }

}
