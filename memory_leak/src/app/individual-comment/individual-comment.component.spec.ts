import { ComponentFixture, TestBed } from '@angular/core/testing';
import TestBedExtended from 'src/test_helpers/testBedExtend';

import { IndividualCommentComponent } from './individual-comment.component';

describe('IndividualCommentComponent', () => {
  let component: IndividualCommentComponent;
  let fixture: ComponentFixture<IndividualCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBedExtended.createComponent(IndividualCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
