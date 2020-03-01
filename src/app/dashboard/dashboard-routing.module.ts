import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashLayoutComponent } from './dash-layout/dash-layout.component';
import { LandingComponent } from './landing/landing.component';


const routes: Routes = [
  {path: '', component: DashLayoutComponent,
   children: [
     {path: 'dashboard', component: LandingComponent}
   ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
