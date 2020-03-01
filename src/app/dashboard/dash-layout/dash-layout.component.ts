import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-layout',
  templateUrl: './dash-layout.component.html',
  styles: [`
      @import "/assets/dashboard/css/metisMenu.css";
      @import  '/assets/dashboard/css/font-awesome.min.css';
      @import "/assets/dashboard/css/slicknav.min.css";
      @Import "/assets/dashboard/css/typography.css";
      @import "/assets/dashboard/css/default-css.css";
      /* @import "/assets/dashboard/css/styles.css"; */
      @import "/assets/dashboard/css/responsive.css";
    `]
})
export class DashLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('dahboard');
  }

}
