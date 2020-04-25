import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserI } from 'src/app/auth/components/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-header',
  templateUrl: './dash-header.component.html',
  styleUrls: ['./dash-header.component.scss']
})
export class DashHeaderComponent implements OnInit {
  user: UserI;
  constructor(
    private authSrv: AuthService,
    private router: Router) {
    this.authSrv.currentUserValue.subscribe(res => {
      this.user = res;
    });
  }

  ngOnInit() {}
  logout() {
    this.authSrv.logout();
    this.router.navigate(['/auth/login']);
  }
}
