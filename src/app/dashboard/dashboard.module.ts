import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LandingComponent } from './landing/landing.component';
import { DashLayoutComponent } from './dash-layout/dash-layout.component';
import { DashHeaderComponent } from './core/dash-header/dash-header.component';
import { DashFooterComponent } from './core/dash-footer/dash-footer.component';
import { DashSidebarComponent } from './core/dash-sidebar/dash-sidebar.component';
import { FundWalletComponent } from './fund-wallet/fund-wallet.component';
import { SharedModule } from '../shared/shared.module';
import { BuySellComponent } from './buy-sell/buy-sell.component';
import { TransactionsComponent } from './transactions/transactions.component';


@NgModule({
  declarations: [
    LandingComponent,
    DashLayoutComponent,
    DashHeaderComponent,
    DashFooterComponent,
    DashSidebarComponent,
    FundWalletComponent,
    BuySellComponent,
    TransactionsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
