import { UserService } from './user.service';
import TestBedExtended from 'src/test_helpers/testBedExtend';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBedExtended.preConfigure();
    service = TestBedExtended.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
