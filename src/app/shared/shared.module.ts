import { LoaderComponent } from './components/loader/loader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const sharedComponent = [
  LoaderComponent,
];

@NgModule({
  declarations: [ ...sharedComponent],
  imports: [
    CommonModule
  ],
  exports: [...sharedComponent]
})
export class SharedModule { }
