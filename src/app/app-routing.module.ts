import { MainLayoutComponent } from './core/components/main-layout/main-layout.component';
import { HomeComponent } from './core/components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
    { path: '', component: HomeComponent},
    {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)}
  ]},
  { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
  { path: '**', redirectTo: '/' , pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
