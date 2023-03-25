import { TestBed } from '@angular/core/testing';

import { BackEndService } from './backend.service';

describe('BackendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackEndService = TestBed.get(BackEndService);
    expect(service).toBeTruthy();
  });
});
