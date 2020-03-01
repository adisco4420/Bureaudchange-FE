import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dash-footer',
  templateUrl: './dash-footer.component.html',
  styleUrls: ['./dash-footer.component.scss']
})
export class DashFooterComponent implements OnInit {
  appName = environment.appName;
  constructor() { }

  ngOnInit() {
  }

}
