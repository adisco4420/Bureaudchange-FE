import { AuthService } from './../../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  unscribe = new Subject();
  error;
  submitted = false;
  disBtn = false;
  passwordPattern = '[a-zA-Z ]*';
  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, Validators.max(99999999999999), Validators.min(99999999)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });
  get controls() {return this.form.controls; }
  constructor(private authSrv: AuthService) { }

  ngOnInit() {
  }

  register() {
    if (this.form.valid) {
      this.disBtn = true;
      this.authSrv.register(this.form.value).pipe(takeUntil(this.unscribe)).subscribe(res => {
        
      }, err => {

      });
    } else {
      this.submitted = true;
    }
  }

  ngOnDestroy() {
    this.unscribe.next();
    this.unscribe.complete();
  }

}
