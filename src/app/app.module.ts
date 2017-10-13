import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './home/home.component';
import { SpeechRecognizerService } from './shared/services/speech-recognizer.service';
import { SpeechSynthesizerService } from './shared/services/speech-synthesizer.service';
import { StyleManager } from './shared/style-manager';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [SpeechRecognizerService, SpeechSynthesizerService, StyleManager],
  bootstrap: [AppComponent]
})
export class AppModule { }
