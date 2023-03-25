import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Film } from './films.model';

@Injectable()
export class FilmService {

    constructor(
        @Inject('FILM_MICROSERVICE') private readonly filmMicroServiceClient: ClientProxy
    ) { }

    addFilm(filmData: Film) {
        return this.filmMicroServiceClient
            .send<any>('add_film', filmData)
            .toPromise();
    }

    getAllFilms() {
        return this.filmMicroServiceClient
            .send<any>('get_films', '')
            .toPromise();
    }

    updateFilmById(id, data: any) {
        const updatedFilm = { ...data };
        if (data.title) {
            updatedFilm.title = data.title;
        }
        if (data.director) {
            updatedFilm.director = data.director;
        }
        if (data.year) {
            updatedFilm.year = data.year;
        }

        if (data.actors) {
            updatedFilm.actors = data.actors;
        }

        return this.filmMicroServiceClient
        .send<any>('update_films', { id, updatedFilm })
        .toPromise();
    }

    getFilmById(id) {

        return this.filmMicroServiceClient
        .send<any>('get_film_by_id', { id })
        .toPromise();
    }

    removeFilm(id: string) {
        return this.filmMicroServiceClient
            .send<any>('remove_films', { id })
            .toPromise();
    }
}