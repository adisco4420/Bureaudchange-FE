import { Component, OnInit } from '@angular/core';

declare const $: any;
@Component({
  selector: 'app-dash-header',
  templateUrl: './dash-header.component.html',
  styleUrls: ['./dash-header.component.css']
})
export class DashHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.jqueryFunction();
  }
  

  jqueryFunction() {
        /*================================
    sidebar collapsing
    ==================================*/
    $('.nav-btn').on('click', function() {
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

}
