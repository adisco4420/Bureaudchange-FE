import { UsersBankService } from './services/users-bank.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LandingComponent } from './landing/landing.component';
import { DashLayoutComponent } from './core/dash-layout/dash-layout.component';
import { DashHeaderComponent } from './core/dash-header/dash-header.component';
import { DashFooterComponent } from './core/dash-footer/dash-footer.component';
import { DashSidebarComponent } from './core/dash-sidebar/dash-sidebar.component';
import { FundWalletComponent } from './fund-wallet/fund-wallet.component';
import { SharedModule } from '../shared/shared.module';
import { BuySellComponent } from './buy-sell/buy-sell.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { NgxPaginationModule} from 'ngx-pagination';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BankCardComponent } from './user-profile/bank-card/bank-card.component';
import { DispenseComponent } from './dispense/dispense.component';


@NgModule({
  declarations: [
    LandingComponent,
    DashLayoutComponent,
    DashHeaderComponent,
    DashFooterComponent,
    DashSidebarComponent,
    FundWalletComponent,
    BuySellComponent,
    TransactionsComponent,
    UserProfileComponent,
    BankCardComponent,
    DispenseComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxPaginationModule,
    SharedModule
  ],
  providers: [ UsersBankService]
})
export class DashboardModule { }
