import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionStrategy } from './action-strategy';
import { ChangeThemeStrategy } from './change-theme-strategy';
import { ChangeTitleStrategy } from './change-title-strategy';
import { SpeechSynthesizerService } from '../web-apis/speech-synthesizer.service';

@Injectable({
  providedIn: 'root',
})
export class ActionContext {
  private currentStrategy?: ActionStrategy;

  constructor(
    private changeThemeStrategy: ChangeThemeStrategy,
    private changeTitleStrategy: ChangeTitleStrategy,
    private titleService: Title,
    private speechSynthesizer: SpeechSynthesizerService
  ) {
    this.changeTitleStrategy.titleService = titleService;
  }

  processMessage(message: string, language: string): void {
    const msg = message.toLowerCase();
    const hasChangedStrategy = this.hasChangedStrategy(msg, language);

    let isFinishSignal = false;
    if (!hasChangedStrategy) {
      isFinishSignal = this.isFinishSignal(msg, language);
    }

    if (!hasChangedStrategy && !isFinishSignal) {
      this.runAction(message, language);
    }
  }

  runAction(input: string, language: string): void {
    if (this.currentStrategy) {
      this.currentStrategy.runAction(input, language);
    }
  }

  setStrategy(strategy: ActionStrategy | undefined): void {
    this.currentStrategy = strategy;
  }

  private hasChangedStrategy(message: string, language: string): boolean {
    let strategy: ActionStrategy | undefined;
    if (message === this.changeThemeStrategy.getStartSignal(language)) {
      strategy = this.changeThemeStrategy;
    }
    if (message === this.changeTitleStrategy.getStartSignal(language)) {
      strategy = this.changeTitleStrategy;
    }

    if (strategy) {
      this.setStrategy(strategy);
      this.speechSynthesizer.speak(
        strategy.getInitialResponse(language),
        language
      );
      return true;
    }

    return false;
  }

  private isFinishSignal(message: string, language: string): boolean {
    if (
      message === this.changeThemeStrategy.getEndSignal(language) ||
      message === this.changeTitleStrategy.getEndSignal(language)
    ) {
      if (this.currentStrategy) {
        this.speechSynthesizer.speak(
          this.currentStrategy.getFinishResponse(language),
          language
        );
      }
      this.setStrategy(undefined);
      return true;
    }

    return false;
  }
}
