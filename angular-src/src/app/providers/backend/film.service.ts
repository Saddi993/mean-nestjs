import { Injectable } from '@angular/core';
import { BackEndService } from './backend.service';

@Injectable({
  providedIn: 'root'
})

export class FilmRestService {

  constructor(private backend: BackEndService) { }

  getFilms() {
    return this.backend.get(`/films`);
  }
}
