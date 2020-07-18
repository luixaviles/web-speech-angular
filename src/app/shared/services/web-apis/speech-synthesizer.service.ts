import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpeechSynthesizerService {
  speechSynthesizer!: SpeechSynthesisUtterance;

  constructor() {
    this.initSynthesis();
  }

  initSynthesis(): void {
    this.speechSynthesizer = new SpeechSynthesisUtterance();
    this.speechSynthesizer.volume = 1;
    this.speechSynthesizer.rate = 1;
    this.speechSynthesizer.pitch = 0.2;
  }

  speak(message: string, language: string): void {
    this.speechSynthesizer.lang = language;
    this.speechSynthesizer.text = message;
    speechSynthesis.speak(this.speechSynthesizer);
  }
}
