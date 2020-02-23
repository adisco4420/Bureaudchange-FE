import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-loader',
  template: ` <div class="la-line-spin-clockwise-fade">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>`,
  styleUrls: ['./btn-loader.css']
})
export class BtnLoaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
export const Loaders = [ BtnLoaderComponent ];

