import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebSpeechComponent } from './web-speech.component';

describe('WebSpeechComponent', () => {
  let component: WebSpeechComponent;
  let fixture: ComponentFixture<WebSpeechComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebSpeechComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebSpeechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
