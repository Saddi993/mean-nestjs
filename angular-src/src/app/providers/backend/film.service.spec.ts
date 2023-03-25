import { TestBed } from '@angular/core/testing';

import { FilmRestService } from './film.service';

describe('TodoRestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilmRestService = TestBed.get(FilmRestService);
    expect(service).toBeTruthy();
  });
});
