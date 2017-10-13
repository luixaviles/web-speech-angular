import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpeechRecognizerService } from '../shared/services/speech-recognizer.service';

import { SpeechNotification } from '../shared/model/speech-notification';
import { SpeechError } from '../shared/model/speech-error';
import { StyleManager } from '../shared/style-manager'
import { Theme } from '../shared/model/theme'
import { Action } from '../shared/model/action'

@Component({
  selector: 'wsa-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  finalTranscript: string = '';
  recognizing: boolean = false;
  notification: string;
  themes: Theme[] = [
    {
      keyword: 'deep',
      href: 'deeppurple-amber.css'
    },
    {
      keyword: 'indigo',
      href: 'indigo-pink.css'
    },
    {
      keyword: 'pink',
      href: 'pink-bluegrey.css'
    },
    {
      keyword: 'purple',
      href: 'purple-green.css'
    }
  ];
  actionMode: Action = Action.UNDEFINED;

  constructor(private changeDetector: ChangeDetectorRef,
    private speechRecognizer: SpeechRecognizerService,
    private styleManager: StyleManager) { }

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
        this.notification = null;
      });

    this.speechRecognizer.onResult()
      .subscribe((data: SpeechNotification) => {
        const message = data.content.trim();
        console.log('HomeComponent.onResult', data);
        if (data.info === 'final_transcript' && message.length > 0) {
          this.finalTranscript = `${this.finalTranscript}\n${message}`;
          if (message === 'enable color') {
            this.actionMode = Action.CHANGE_THEME_COLOR;
          }
          else if (message === 'disable color') {
            this.actionMode = Action.UNDEFINED;
          }

          this.detectChanges();
          this.changeTheme(message);
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
            this.notification = null;
            break;
        }
        this.recognizing = false;
        this.detectChanges();
      });
  }

  detectChanges() {
    this.changeDetector.detectChanges();
  }

  changeTheme(input: string) {
    console.log('changeTheme', input);
    if (this.actionMode !== Action.CHANGE_THEME_COLOR) {
      return;
    }

    let theme = this.themes.find((theme) => {
      return input === theme.keyword;
    });
    if (theme) {
      this.styleManager.removeStyle('theme');
      this.styleManager.setStyle('theme', `assets/theme/${theme.href}`);
    }
  }
}
