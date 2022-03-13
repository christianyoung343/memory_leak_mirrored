import { ComponentFixture, TestBed } from '@angular/core/testing';
import TestBedExtended from 'src/test_helpers/testBedExtend';

import { QuestionCreationParentComponent } from './question-creation-parent.component';

describe('QuestionCreationParentComponent', () => {
  let component: QuestionCreationParentComponent;
  let fixture: ComponentFixture<QuestionCreationParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionCreationParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBedExtended.preConfigure()
    fixture = TestBedExtended.createComponent(QuestionCreationParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
