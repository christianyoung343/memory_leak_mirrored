import { ComponentFixture, TestBed } from '@angular/core/testing';
import TestBedExtended from 'src/test_helpers/testBedExtend';

import { AdminParentComponent } from './admin-parent.component';

describe('AdminParentComponent', () => {
  let component: AdminParentComponent;
  let fixture: ComponentFixture<AdminParentComponent>;

  beforeEach(async () => {
    TestBedExtended.preConfigure();
    await TestBedExtended.configureTestingModule({
      declarations: [ AdminParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
