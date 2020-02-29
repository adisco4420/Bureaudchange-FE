import { LoaderComponent } from './components/loader/loader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const sharedComponent = [
  LoaderComponent,
];
const sharedModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
];

@NgModule({
  declarations: [ ...sharedComponent],
  imports: [
    ...sharedModules,
  ],
  exports: [...sharedComponent, ...sharedModules, ]
})
export class SharedModule { }
