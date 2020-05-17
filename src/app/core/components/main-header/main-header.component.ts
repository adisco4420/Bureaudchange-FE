import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/shared/general.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
declare const $: any;
@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {
  appName = environment.appName;
  constructor(
    public gs: GeneralService,
    private authSrv: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.getNavLogic();
  }
  getNavLogic() {
    const siteNav = $('#navbar');
    siteNav.on('show.bs.collapse', function(e) {
        $(this).parents('.nav-menu').addClass('menu-is-open');
    });
    siteNav.on('hide.bs.collapse', function(e) {
        $(this).parents('.nav-menu').removeClass('menu-is-open');
    });
  }
  openContent(content) {
    $("html, body").animate(
      { scrollTop: $(`#${content}`).offset().top }, "slow"
    );
  }
  logout() {
    this.authSrv.logout();
    this.router.navigate(['/auth/login']);
  }

}
