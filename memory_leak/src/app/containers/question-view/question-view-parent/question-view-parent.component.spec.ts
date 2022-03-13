import { ComponentFixture, TestBed } from '@angular/core/testing';
import TestBedExtended from 'src/test_helpers/testBedExtend';
import { QuestionComponent } from '../../question/question/question.component';

import { QuestionViewParentComponent } from './question-view-parent.component';

describe('QuestionViewParentComponent', () => {
  let component: QuestionViewParentComponent;
  let fixture: ComponentFixture<QuestionViewParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionViewParentComponent, QuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBedExtended.preConfigure()
    fixture = TestBedExtended.createComponent(QuestionViewParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
