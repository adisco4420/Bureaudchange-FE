import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LandingComponent } from './landing/landing.component';
import { DashLayoutComponent } from './dash-layout/dash-layout.component';
import { DashHeaderComponent } from './core/dash-header/dash-header.component';
import { DashFooterComponent } from './core/dash-footer/dash-footer.component';
import { DashSidebarComponent } from './core/dash-sidebar/dash-sidebar.component';


@NgModule({
  declarations: [LandingComponent, DashLayoutComponent, DashHeaderComponent, DashFooterComponent, DashSidebarComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
