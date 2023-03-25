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

  addMovie(data: any) {
    console.log(data);
    return this.backend.post(`/films`, data);
  }
}
