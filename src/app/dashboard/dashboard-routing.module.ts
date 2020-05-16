import { DispenseComponent } from './dispense/dispense.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BuySellComponent } from './buy-sell/buy-sell.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashLayoutComponent } from './core/dash-layout/dash-layout.component';
import { LandingComponent } from './landing/landing.component';
import { FundWalletComponent } from './fund-wallet/fund-wallet.component';
import { TransactionsComponent } from './transactions/transactions.component';


const routes: Routes = [
  {path: '', component: DashLayoutComponent,
   children: [
     {path: 'dashboard', component: LandingComponent, data: {heading: 'Dashboard'}},
     {path: 'fund-wallet', component: FundWalletComponent, data: {heading: 'Fund Wallet'}},
     {path: 'exchange', component: BuySellComponent, data: {heading: 'Exchange'}},
     {path: 'transactions', component: TransactionsComponent, data: {heading: 'Transactions'}},
     {path: 'dispense', component: DispenseComponent, data: {heading: 'Dispense Cash'}},
     {path: 'user-profile', component: UserProfileComponent, data: {heading: 'User Profile'}},
   ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
