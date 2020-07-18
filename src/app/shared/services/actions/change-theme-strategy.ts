import { ActionStrategy } from './action-strategy';
import { Theme } from '../../model/theme';
import { StyleManager } from '../../style-manager/style-manager';
import { Injectable } from '@angular/core';
import { SpeechSynthesizerService } from '../web-apis/speech-synthesizer.service';

@Injectable({
  providedIn: 'root',
})
export class ChangeThemeStrategy extends ActionStrategy {
  private mapThemes: Map<string, Theme[]> = new Map<string, Theme[]>();
  private styleManager: StyleManager = new StyleManager();

  constructor(private speechSynthesizer: SpeechSynthesizerService) {
    super();
    this.mapStartSignal.set('en-US', 'perform change theme');
    this.mapStartSignal.set('es-ES', 'iniciar cambio de tema');

    this.mapEndSignal.set('en-US', 'finish change theme');
    this.mapEndSignal.set('es-ES', 'finalizar cambio de tema');

    this.mapInitResponse.set('en-US', 'Please, tell me your theme name.');
    this.mapInitResponse.set('es-ES', 'Por favor, mencione el nombre de tema.');

    this.mapActionDone.set('en-US', 'Changing Theme of the Application to');
    this.mapActionDone.set('es-ES', 'Cambiando el tema de la Aplicación a');

    this.mapThemes.set('en-US', [
      {
        keyword: 'deep purple',
        href: 'deeppurple-amber.css',
      },
      {
        keyword: 'indigo',
        href: 'indigo-pink.css',
      },
      {
        keyword: 'pink',
        href: 'pink-bluegrey.css',
      },
      {
        keyword: 'purple',
        href: 'purple-green.css',
      },
    ]);
    this.mapThemes.set('es-ES', [
      {
        keyword: 'púrpura',
        href: 'deeppurple-amber.css',
      },
      {
        keyword: 'azul',
        href: 'indigo-pink.css',
      },
      {
        keyword: 'rosa',
        href: 'pink-bluegrey.css',
      },
      {
        keyword: 'verde',
        href: 'purple-green.css',
      },
    ]);
  }

  runAction(input: string, language: string): void {
    const themes = this.mapThemes.get(language) || [];
    const theme = themes.find((th) => {
      return input.toLocaleLowerCase() === th.keyword;
    });

    if (theme) {
      this.styleManager.removeStyle('theme');
      this.styleManager.setStyle('theme', `assets/theme/${theme.href}`);
      this.speechSynthesizer.speak(
        `${this.mapActionDone.get(language)}: ${theme.keyword}`,
        language
      );
    }
  }
}
