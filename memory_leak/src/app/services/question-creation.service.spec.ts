import { TestBed } from '@angular/core/testing';
import TestBedExtended from 'src/test_helpers/testBedExtend';

import { QuestionCreationService } from './question-creation.service';

describe('QuestionCreationService', () => {
  let service: QuestionCreationService;

  beforeEach(() => {
    TestBedExtended.preConfigure();
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
