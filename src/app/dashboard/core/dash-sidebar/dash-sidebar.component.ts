import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

declare const $: any;
@Component({
  selector: 'app-dash-sidebar',
  templateUrl: './dash-sidebar.component.html',
  styleUrls: ['./dash-sidebar.component.scss']
})
export class DashSidebarComponent implements OnInit {
  appName = environment.appName;
  constructor() { }

  ngOnInit() {
    this.sidebarFunc();
  }

  sidebarFunc() {
      /*================================
      sidebar collapsing
      ==================================*/
      $('.nav-btn').on('click', () => {
        $('.page-container').toggleClass('sbar_collapsed');
      });
      /*================================
      sidebar menu
      ==================================*/
      $('#menu').metisMenu();
      /*================================
      slimscroll activation
      ==================================*/
      $('.menu-inner').slimScroll({
        height: 'auto'
      });
      $('.nofity-list').slimScroll({
        height: '435px'
      });
      $('.timeline-area').slimScroll({
        height: '500px'
      });
      $('.recent-activity').slimScroll({
        height: 'calc(100vh - 114px)'
      });
      $('.settings-list').slimScroll({
        height: 'calc(100vh - 158px)'
      });
  }
  closeSidebar() {
    if (screen.width <= 600) {
      const element = document.getElementById('closeSidebar');
      if (element) {
        element.click();
      }
    }
  }
}
