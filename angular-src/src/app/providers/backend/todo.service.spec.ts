import { TestBed } from '@angular/core/testing';

import { TodoRestService } from './todo.service';

describe('TodoRestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodoRestService = TestBed.get(TodoRestService);
    expect(service).toBeTruthy();
  });
});
