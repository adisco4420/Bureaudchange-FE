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
  loading = false;
  error;
  resendEmailMsg;
  resendLoading = false;
  constructor(
    private authSrv: AuthService,
    private gs: GeneralService,
    private toastr: ToastrService,
    private router: Router) { }

  login(form: NgForm) {
    if (form.valid) {
      this.loading = true;
      this.resendEmailMsg = this.error = null;
      this.authSrv.login(form.value).pipe(takeUntil(this.unscribe)).subscribe(res => {
        const token = this.gs.getSuccessData(res);
        this.gs.storeToken(token);
        this.authSrv.currentUserSubject.next(this.gs.getCurrentUser);
        this.router.navigate(['/dashboard']);
        this.error = null;
        this.toastr.success('Login Successful');
      }, err => {
        this.error = err;
      }).add(() => {
        this.loading = false;
      });
    }
  }
  resendEmail(form: NgForm) {
    const email = form.value.email;
    if (email) {
      this.resendLoading = true;
      this.resendEmailMsg = null;
      this.authSrv.resendConfirmEmail(email).subscribe(res  => {
        this.error = null;
        this.resendEmailMsg = this.gs.getSucessMsg(res);
      }, err => {
        this.error = err;
      }).add(() => {
        this.resendLoading = false;
      });
    }
  }

  ngOnDestroy() {
    this.unscribe.next();
    this.unscribe.complete();
  }
}
