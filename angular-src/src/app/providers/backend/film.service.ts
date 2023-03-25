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

  getFilmById(id) {
    return this.backend.get(`/films/${id}`);
  }

  updateFilmByID(id, data) {
    return this.backend.patch(`/films/${id}`, data);
  }

  addMovie(data: any) {
    return this.backend.post(`/films`, data);
  }

  removeMovie(id: any) {
    return this.backend.delete(`/films/${id}`);
  }
}
