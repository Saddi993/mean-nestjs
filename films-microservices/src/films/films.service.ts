import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film } from './films.model';

@Injectable()
export class FilmService {

    constructor (@InjectModel('film') private readonly filmModel: Model<Film>) {}

    async createFilm(createFilmReq: Film) {
        console.log('Film Microservice', createFilmReq);
        await this.filmModel.create(createFilmReq);
        
    }

    async getFilms() {
        const data = await this.filmModel.find();
        return data;
    }
}