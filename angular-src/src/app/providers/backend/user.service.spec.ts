import { TestBed } from '@angular/core/testing';

import { UserRestService } from './user.service';

describe('TodoRestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserRestService = TestBed.get(UserRestService);
    expect(service).toBeTruthy();
  });
});
