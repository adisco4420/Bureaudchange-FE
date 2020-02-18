import { MainLayoutComponent } from './core/components/main-layout/main-layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './core/components/home/home.component';
import { MainHeaderComponent } from './core/components/main-header/main-header.component';
import { MainFooterComponent } from './core/components/main-footer/main-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainHeaderComponent,
    MainFooterComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
