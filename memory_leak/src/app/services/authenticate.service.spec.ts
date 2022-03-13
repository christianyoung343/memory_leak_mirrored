import { TestBed } from '@angular/core/testing';
import TestBedExtended from 'src/test_helpers/testBedExtend';

import { AuthenticateService } from './authenticate.service';

describe('AuthenticateService', () => {
  let service: AuthenticateService;

  beforeEach(() => {
    TestBedExtended.preConfigure();
    service = TestBed.inject(AuthenticateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
