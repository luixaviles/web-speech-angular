import { TestBed } from '@angular/core/testing';

import { SpeechRecognizerService } from './speech-recognizer.service';

describe('SpeechRecognizerService', () => {
  let service: SpeechRecognizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeechRecognizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
