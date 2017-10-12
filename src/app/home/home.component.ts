import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpeechRecognizerService } from '../shared/services/speech-recognizer.service';

import { SpeechNotification } from '../shared/model/speech-notification';

@Component({
  selector: 'wsa-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  finalTranscript = '';
  recognizing: boolean = false;

  constructor(private changeDetector: ChangeDetectorRef,
    private speechRecognizer: SpeechRecognizerService) { }

  ngOnInit() {
    this.initRecognition();
  }

  startButton(event) {
    if (this.recognizing) {
      this.speechRecognizer.stop();
      return;
    }

    this.speechRecognizer.start(event.timeStamp);
  }

  private initRecognition() {
    this.speechRecognizer.onStart()
      .subscribe(data => {
        //TODO, process data
        console.log('HomeComponent.onStart', data);
        this.recognizing = true;
        this.detectChanges();
      });

    this.speechRecognizer.onEnd()
      .subscribe(data => {
        //TODO, process data
        console.log('HomeComponent.onEnd', data);
        this.recognizing = false;
        this.detectChanges();
      });

    this.speechRecognizer.onResult()
      .subscribe((data: SpeechNotification) => {
        //TODO, process data
        console.log('HomeComponent.onResult', data);
        if (data.info === 'final_transcript' && data.content.trim().length > 0) {
          this.finalTranscript = `${this.finalTranscript}\n${data.content.trim()}`;
          this.detectChanges();
        }
      });

    this.speechRecognizer.onError()
      .subscribe(data => {
        //TODO, process data.
        console.log('HomeComponent.onError', data);
        this.recognizing = false;
        this.detectChanges();
      });
  }

  detectChanges() {
    this.changeDetector.detectChanges();
  }
}
