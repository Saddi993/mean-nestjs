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

    removeFilm(id) {
        return this.filmMicroServiceClient
        .send<any>('remove_films', { id })
        .toPromise();
    }
}