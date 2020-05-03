import { UserProfileComponent } from './user-profile/user-profile.component';
import { BuySellComponent } from './buy-sell/buy-sell.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashLayoutComponent } from './dash-layout/dash-layout.component';
import { LandingComponent } from './landing/landing.component';
import { FundWalletComponent } from './fund-wallet/fund-wallet.component';
import { TransactionsComponent } from './transactions/transactions.component';


const routes: Routes = [
  {path: '', component: DashLayoutComponent,
   children: [
     {path: 'dashboard', component: LandingComponent},
     {path: 'fund-wallet', component: FundWalletComponent},
     {path: 'exchange', component: BuySellComponent},
     {path: 'transactions', component: TransactionsComponent},
     {path: 'user-profile', component: UserProfileComponent},
   ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
