import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './core/components/home/home.component';
import { MainLayoutComponent } from './core/components/main-layout/main-layout.component';
import { MainHeaderComponent } from './core/components/main-header/main-header.component';
import { MainFooterComponent } from './core/components/main-footer/main-footer.component';
import { ErrorInterceptor } from './inteceptor/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainHeaderComponent,
    MainFooterComponent,
    MainLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
