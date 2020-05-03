import { GeneralService } from 'src/app/shared/general.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserI } from 'src/app/auth/components/user.model';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dash-header',
  templateUrl: './dash-header.component.html',
  styleUrls: ['./dash-header.component.scss']
})
export class DashHeaderComponent implements OnInit, OnDestroy {
  private unscribe = new Subject();
  user: UserI;
  constructor(
    private authSrv: AuthService,
    private router: Router,
    private gs: GeneralService) {
    this.authSrv.currentUserValue.subscribe(res => {
      this.user = res;
    });
  }

  ngOnInit() {
    this.getProfile();
  }
  getProfile() {
    this.authSrv.userProfile().pipe(takeUntil(this.unscribe))
      .subscribe(res => {
        this.user = this.gs.getSuccessData(res);
      });
  }
  logout() {
    this.authSrv.logout();
    this.router.navigate(['/auth/login']);
  }

  ngOnDestroy() {
    this.unscribe.next();
    this.unscribe.complete();
  }


}
