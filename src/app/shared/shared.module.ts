import { Loaders } from './components/loader/loader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const sharedComponent = [
  ...Loaders,
];

@NgModule({
  declarations: [ ...sharedComponent],
  imports: [
    CommonModule
  ],
  exports: [...sharedComponent]
})
export class SharedModule { }
