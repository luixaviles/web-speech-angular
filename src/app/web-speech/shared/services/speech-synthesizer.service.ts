import { Injectable } from '@angular/core';

@Injectable()
export class SpeechSynthesizerService {
  message;

  constructor() {
    this.initSynthesis();
  }

  initSynthesis(): void {
    this.message = new SpeechSynthesisUtterance();
    this.message.volume = 1;
    this.message.rate = 1;
    this.message.pitch = 0.2;
  }

  speak(message: string, language: string): void {
    this.message.lang = language;
    console.log('speaking, ', this.message.lang);
    this.message.text = message;
    speechSynthesis.speak(this.message);
  }
}
