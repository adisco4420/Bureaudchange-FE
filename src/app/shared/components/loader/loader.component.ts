import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Output() reload = new EventEmitter();
  @Input() loadingErr: {status: number, error: string};
  @Input() type: 'clip-rotate' | 'clockwise-fade'|'wave' = 'clockwise-fade';
  @Input() classes: string;
  constructor() { }

  ngOnInit() {}

  reloadSpinner() {
    this.loadingErr = null;
    this.reload.emit();
  }

}

