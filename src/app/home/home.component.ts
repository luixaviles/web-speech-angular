import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppWindow } from '../shared/app-window';

const { webkitSpeechRecognition }: AppWindow = <AppWindow>window;

@Component({
  selector: 'wsa-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recognition: any;

  create_email: boolean = false;
  final_transcript = '';
  recognizing: boolean = false;
  ignore_onend: boolean;
  start_timestamp;

  final_span;
  interim_span;
  that = this;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.initRecognition();
  }

  startButton(event) {
    console.log(event);
    if (this.recognizing) {
      this.recognition.stop();
      return;
    }

    this.final_transcript = '';
    this.recognition.lang = 'en-US';
    this.recognition.start();
    this.ignore_onend = false;
    this.final_span = '';
    this.interim_span = '';
    // start_img.src = 'mic-slash.gif';
    this.showInfo('info_allow');
    // showButtons('none');
    this.start_timestamp = event.timeStamp;
  }

  private initRecognition() {
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;

    this.recognition.onstart = () => {
      this.recognizing = true;
      this.showInfo('info_speak_now');
      // start_img.src = 'mic-animate.gif';
    };

    this.recognition.onerror = (event) => {
      if (event.error == 'no-speech') {
        // start_img.src = 'mic.gif';
        this.showInfo('info_no_speech');
        this.ignore_onend = true;
      }
      if (event.error == 'audio-capture') {
        // start_img.src = 'mic.gif';
        this.showInfo('info_no_microphone');
        this.ignore_onend = true;
      }
      if (event.error == 'not-allowed') {
        if (event.timeStamp - this.start_timestamp < 100) {
          this.showInfo('info_blocked');
        } else {
          this.showInfo('info_denied');
        }
        this.ignore_onend = true;
      }
    };

    this.recognition.onend = () => {
      this.recognizing = false;
      if (this.ignore_onend) {
        return;
      }
      // start_img.src = 'mic.gif';
      if (!this.final_transcript) {
        this.showInfo('info_start');
        return;
      }
      this.showInfo('');
      console.log('Finished!');
      // if (window.getSelection) {
      //   window.getSelection().removeAllRanges();
      //   var range = document.createRange();
      //   range.selectNode(document.getElementById('final_span'));
      //   window.getSelection().addRange(range);
      // }
      // if (this.create_email) {
      //   this.create_email = false;
      //   this.createEmail();
      // }
    };

    this.recognition.onresult = (event) => {
      console.log('Running onresult', event);
      let interim_transcript = '';
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          this.final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }
      console.log('final_transcript', this.final_transcript);
      this.final_transcript = this.capitalize(this.final_transcript);
      this.cd.detectChanges();
      console.log('final_transcript.capitalize', this.final_transcript);
      this.final_span = this.linebreak(this.final_transcript);
      console.log('final_span', this.final_span);
      this.interim_span = this.linebreak(interim_transcript);
      console.log('interim_span', this.interim_span);
      if (this.final_transcript || interim_transcript) {
        this.showButtons('inline-block');
      }
    };
  }

  showInfo(s: string) {
    console.log('showInfo, ', s);

  }

  createEmail() {

  }

  showButtons(s: string) {

  }


  two_line = /\n\n/g;
  one_line = /\n/g;
  linebreak(s) {
    return s.replace(this.two_line, '<p></p>').replace(this.one_line, '<br>');
  }

  first_char = /\S/;
  capitalize(s) {
    return s.replace(this.first_char, function (m) { return m.toUpperCase(); });
  }

}

