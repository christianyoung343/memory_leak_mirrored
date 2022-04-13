import { ComponentFixture, TestBed } from '@angular/core/testing';
import TestBedExtended from 'src/test_helpers/testBedExtend';

import { IndividualAnswerComponent } from './individual-answer.component';

describe('IndividualAnswerComponent', () => {
  let component: IndividualAnswerComponent;
  let fixture: ComponentFixture<IndividualAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualAnswerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBedExtended.preConfigure()
    fixture = TestBedExtended.createComponent(IndividualAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
