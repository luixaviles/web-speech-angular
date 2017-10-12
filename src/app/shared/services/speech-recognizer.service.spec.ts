import { TestBed, inject } from '@angular/core/testing';

import { SpeechRecognizerService } from './speech-recognizer.service';

describe('SpeechRecognizerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpeechRecognizerService]
    });
  });

  it('should be created', inject([SpeechRecognizerService], (service: SpeechRecognizerService) => {
    expect(service).toBeTruthy();
  }));
});
