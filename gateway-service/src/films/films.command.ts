import { Command, Positional, Option } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { FilmService } from './films.service';
import { Film } from './films.model';

import * as bcrypt from 'bcrypt';

@Injectable()
export class FilmCommand {
    constructor(private readonly filmService: FilmService) { }

    @Command({
        command: 'create:film',
        describe: 'create a film',
    })
    async create() {

        const hashed = await bcrypt.hash('123456', 12);
        const films: Film[] = [
            {   
                id: new Date().toDateString(),
                title: 'The Shawshank Redemption',
                director: 'Frank Darabont',
                year: 1994,
                actors: ['ALEX']
              },
              {
                id: new Date().toDateString(),
                title: 'The Godfather',
                director: 'Francis Ford Coppola',
                year: 1972,
                actors: ['JOHN']
              },
              {
                id: new Date().toDateString(),
                title: 'The Dark Knight',
                director: 'Christopher Nolan',
                year: 2008,
                actors: ['MARTNI']
              }
        ]

        console.log(films);

        for (const film of films) {
            await this.filmService.addFilm(film);
        }
    }
}