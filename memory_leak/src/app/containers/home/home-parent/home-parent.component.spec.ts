import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { UserService } from 'src/app/services/user.service';
import TestBedExtended from 'src/test_helpers/testBedExtend';

import { HomeParentComponent } from './home-parent.component';

describe('HomeParentComponent', () => {
  let component: HomeParentComponent;
  let fixture: ComponentFixture<HomeParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBedExtended.preConfigure()
    fixture = TestBedExtended.createComponent(HomeParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
