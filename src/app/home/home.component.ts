import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpeechRecognizerService } from '../shared/services/speech-recognizer.service';

import { SpeechNotification } from '../shared/model/speech-notification';
import { SpeechError } from '../shared/model/speech-error';

@Component({
  selector: 'wsa-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  finalTranscript: string = '';
  recognizing: boolean = false;
  notification: string;

  constructor(private changeDetector: ChangeDetectorRef,
    private speechRecognizer: SpeechRecognizerService) { }

  ngOnInit() {
    this.initRecognition();
    this.notification = null;
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
        this.recognizing = true;
        this.notification = 'I\'m listening...';
        this.detectChanges();
      });

    this.speechRecognizer.onEnd()
      .subscribe(data => {
        this.recognizing = false;
        this.detectChanges();
      });

    this.speechRecognizer.onResult()
      .subscribe((data: SpeechNotification) => {
        console.log('HomeComponent.onResult', data);
        if (data.info === 'final_transcript' && data.content.trim().length > 0) {
          this.finalTranscript = `${this.finalTranscript}\n${data.content.trim()}`;
          this.detectChanges();
        }
      });

    this.speechRecognizer.onError()
      .subscribe(data => {
        switch (data.error) {
          case SpeechError.BLOCKED:
          case SpeechError.NOT_ALLOWED:
            this.notification = `Cannot run the demo.
            Your browser is not authorized to access your microphone. Verify that your browser has access to your microphone and try again.
            `
            break;
          case SpeechError.NO_SPEECH:
            this.notification = `No speech has been detected. Please try again.`;
          break;
          case SpeechError.NO_MICROPHONE:
            this.notification = `Microphone is not available. Plese verify the connection of your microphone and try again.`
          break;
          default:
            break;
        }
        this.recognizing = false;
        this.detectChanges();
      });
  }

  detectChanges() {
    this.changeDetector.detectChanges();
  }
}
