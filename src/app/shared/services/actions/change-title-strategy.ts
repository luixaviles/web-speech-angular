import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SpeechSynthesizerService } from '../web-apis/speech-synthesizer.service';
import { ActionStrategy } from './action-strategy';

@Injectable({
  providedIn: 'root',
})
export class ChangeTitleStrategy extends ActionStrategy {
  private title?: Title;

  constructor(private speechSynthesizer: SpeechSynthesizerService) {
    super();
    this.mapStartSignal.set('en-US', 'perform change title');
    this.mapStartSignal.set('es-ES', 'iniciar cambio de título');

    this.mapEndSignal.set('en-US', 'finish change title');
    this.mapEndSignal.set('es-ES', 'finalizar cambio de título');

    this.mapInitResponse.set('en-US', 'Please, tell me the new title');
    this.mapInitResponse.set('es-ES', 'Por favor, mencione el nuevo título');

    this.mapActionDone.set('en-US', 'Changing title of the Application to');
    this.mapActionDone.set('es-ES', 'Cambiando el título de la Aplicación a');
  }

  set titleService(title: Title) {
    this.title = title;
  }

  runAction(input: string, language: string): void {
    this.title?.setTitle(input);
    this.speechSynthesizer.speak(
      `${this.mapActionDone.get(language)}: ${input}`,
      language
    );
  }
}
