import { TestBed } from '@angular/core/testing';

import { SpeechSynthesizerService } from './speech-synthesizer.service';

describe('SpeechSynthesizerService', () => {
  let service: SpeechSynthesizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeechSynthesizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
