import { TestBed } from '@angular/core/testing';
import TestBedExtended from 'src/test_helpers/testBedExtend';

import { QuestionService } from './question.service';

describe('QuestionService', () => {
  let service: QuestionService;

  beforeEach(() => {
    TestBedExtended.preConfigure()
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
