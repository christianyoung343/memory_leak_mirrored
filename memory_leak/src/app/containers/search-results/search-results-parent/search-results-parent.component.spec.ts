import { ComponentFixture, TestBed } from '@angular/core/testing';
import TestBedExtended from 'src/test_helpers/testBedExtend';

import { SearchResultsParentComponent } from './search-results-parent.component';

describe('SearchResultsParentComponent', () => {
  let component: SearchResultsParentComponent;
  let fixture: ComponentFixture<SearchResultsParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResultsParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBedExtended.preConfigure();
    fixture = TestBedExtended.createComponent(SearchResultsParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
