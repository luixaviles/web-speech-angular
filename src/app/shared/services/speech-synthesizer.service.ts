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
    this.message.lang = 'en-US';
  }

  speak(message): void {
    this.message.text = message;
    speechSynthesis.speak(this.message);
  }

}
