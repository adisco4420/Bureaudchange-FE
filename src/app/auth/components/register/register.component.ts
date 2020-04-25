import { GeneralService } from './../../../shared/general.service';
import { AuthService } from './../../auth.service';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit, OnDestroy {
  unscribe = new Subject();
  error;
  submitted = false;
  disBtn = false;
  passwordPattern = '[a-zA-Z ]*';
  pwdType = 'password';
  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, Validators.max(99999999999999), Validators.min(99999999)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });
  get controls() {return this.form.controls; }
  constructor(
    private authSrv: AuthService,
    private gs: GeneralService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.pwdChange();
  }

  register() {
    if (this.form.valid) {
      this.disBtn = true;
      this.authSrv.register(this.form.value).pipe(takeUntil(this.unscribe)).subscribe((res: any) => {
        this.form.reset();
        this.gs.swtSuccess(res);
      }, err => {
        this.gs.swtError(err);
      }).add(() => {
        this.disBtn = false;
        this.submitted = false;
      });
    } else {
      this.submitted = true;
    }
  }
  showPwd(state: boolean) {
    this.pwdType = state ? 'text' : 'password';
  }
  pwdChange() {
    const pwdField = document.getElementById('pwd-eye');
    if (this.controls.password.value.length >= 8) {
      pwdField.style.bottom = '30%';
    } else {
      pwdField.style.bottom = '50%';
    }
  }

  ngOnDestroy() {
    this.unscribe.next();
    this.unscribe.complete();
  }

}
