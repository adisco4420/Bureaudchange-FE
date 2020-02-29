import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  @Input() type: 'clip-rotate' | 'clockwise-fade' = 'clockwise-fade';
  @Input() classes: string;
  constructor() { }

  ngOnInit() {
  }

}

