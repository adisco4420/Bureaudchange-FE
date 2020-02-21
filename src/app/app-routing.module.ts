import { MainLayoutComponent } from './core/components/main-layout/main-layout.component';
import { HomeComponent } from './core/components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
    { path: '', component: HomeComponent},
    {path: 'auth', loadChildren: './auth/auth.module#AuthModule'}
  ]},
  { path: '**', redirectTo: '/' , pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
