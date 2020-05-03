import { GeneralService } from './../../shared/general.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  private unscribe = new Subject();
  loading = false;
  userInfo;
  userForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl({value: '', disabled: true}, [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    address: new FormGroup({
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      postalcode: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
    })
  });
  constructor(
    private authSrv: AuthService,
    private gs: GeneralService) {

  }
  ngOnInit() {
    this.getProfile();
  }
  getControl(feild: string) {
    return this.userForm.controls[feild];
  }
  getAddressControl(feild: string) {
    return (this.getControl('address')as FormGroup).controls[feild];
  }
  getProfile() {
    this.authSrv.userProfile().pipe(takeUntil(this.unscribe))
      .subscribe(res => {
        this.userInfo = this.gs.getSuccessData(res);
        this.userForm.patchValue(this.userInfo);
      });
  }
  editProfile() {
    if (this.userForm.valid) {
      this.loading = true;
      this.authSrv.editProfile(this.userForm.value).pipe(takeUntil(this.unscribe))
        .subscribe(res => {
          this.authSrv.currentUserSubject.next(this.userForm.value);
          this.gs.swtSuccess(res);
        }, err => {
          this.gs.swtError(err);
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
