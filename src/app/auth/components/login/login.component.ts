import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GeneralService } from 'src/app/shared/general.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements  OnDestroy {
  unscribe = new Subject();
  form = { email: '', password: ''};
  loading = false;
  error;
  constructor(
    private authSrv: AuthService,
    private gs: GeneralService,
    private toastr: ToastrService,
    private router: Router) { }

  login(form: NgForm) {
    if (form.valid) {
      this.loading = true;
      this.error = null;
      this.authSrv.login(form.value).pipe(takeUntil(this.unscribe)).subscribe(res => {
        const token = this.gs.getSuccessData(res);
        this.gs.storeToken(token);
        const data = this.gs.decodeToken(token);
        const navigateTo = data.wallet.length >= 2 ? '/dashboard' : '/auth/wallet-setup';
        this.router.navigate([navigateTo]);
        this.error = null;
        this.toastr.success('Login Successful');
      }, err => {
        this.error = err.error;
      }).add(() => {
        this.loading = false;
      });
    }
  }

  ngOnDestroy() {
    this.unscribe.next();
    this.unscribe.complete();
  }
}
