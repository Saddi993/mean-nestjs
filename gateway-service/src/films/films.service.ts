import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Film } from './films.model';

@Injectable()
export class FilmService {

    constructor(@Inject('FILM_MICROSERVICE') private readonly filmMicroServiceClient: ClientProxy) { }

    async addFilm(filmData: Film) {
        return this.filmMicroServiceClient.emit('add_film', filmData);
    }

    getAllFilms() {
        console.log('getUserByEmail')

        return this.filmMicroServiceClient.send({ cmd: 'get_all_films' }, {});
    }
}