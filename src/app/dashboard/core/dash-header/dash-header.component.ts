import { GeneralService } from 'src/app/shared/general.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserI } from 'src/app/auth/components/user.model';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dash-header',
  templateUrl: './dash-header.component.html',
  styleUrls: ['./dash-header.component.scss']
})
export class DashHeaderComponent implements OnInit, OnDestroy {
  private unscribe = new Subject();
  user: UserI;
  title = 'Dashboard';
  constructor(
    private authSrv: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private gs: GeneralService) {
    this.authSrv.currentUserValue.subscribe(res => {
      this.user = res;
    });
  }

  ngOnInit() {
    this.getProfile();
    this.runOnRouteChange();
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      this.runOnRouteChange();
    });

  }
  runOnRouteChange(): void {
    this.route.children.forEach((route: ActivatedRoute) => {
      let activeRoute: ActivatedRoute = route;
      while (activeRoute.firstChild) {
        activeRoute = activeRoute.firstChild;
      }
      const routeOptions = activeRoute.snapshot.data;
      if (routeOptions && routeOptions.heading) {
        this.title = routeOptions.heading;
      }
    });


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
