import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ModalHelpComponent } from './components/modal-help/modal-help.component';

@NgModule({
  declarations: [ModalHelpComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    ModalHelpComponent
  ]
})
export class SharedModule { }
