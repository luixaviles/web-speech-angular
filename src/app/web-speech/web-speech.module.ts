import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebSpeechComponent } from './web-speech.component';
import { MaterialModule } from '../shared/material/material.module';


@NgModule({
  declarations: [WebSpeechComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class WebSpeechModule { }
