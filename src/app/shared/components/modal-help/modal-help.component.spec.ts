import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalHelpComponent } from './modal-help.component';

describe('ModalHelpComponent', () => {
  let component: ModalHelpComponent;
  let fixture: ComponentFixture<ModalHelpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
