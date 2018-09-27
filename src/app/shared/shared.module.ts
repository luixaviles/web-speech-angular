import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { StyleManager } from './style-manager/style-manager';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule
  ],
  providers: [
    StyleManager
  ]
})
export class SharedModule { }
