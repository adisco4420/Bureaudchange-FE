import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { AuthLayoutComponent } from './components/auth-layout.component';
import { WalletSetupComponent } from './components/wallet-setup/wallet-setup.component';

@NgModule({
  declarations: [ AuthLayoutComponent, LoginComponent, RegisterComponent, ConfirmEmailComponent, WalletSetupComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
})
export class AuthModule { }
