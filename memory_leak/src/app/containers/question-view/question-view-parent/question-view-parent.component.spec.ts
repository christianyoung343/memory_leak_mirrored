import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionViewParentComponent } from './question-view-parent.component';

describe('QuestionViewParentComponent', () => {
  let component: QuestionViewParentComponent;
  let fixture: ComponentFixture<QuestionViewParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionViewParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionViewParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
