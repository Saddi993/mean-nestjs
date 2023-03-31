import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { Film } from './films.model';
import { FilmService } from './films.service';

describe('FilmService', () => {
    let filmService: FilmService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ClientsModule.register([
                    {
                        name: 'USER_MICROSERVICE',
                        transport: Transport.REDIS,
                        options: {
                            host: 'localhost',
                            port: 6379,
                        }
                    },
                    {
                        name: 'FILM_MICROSERVICE',
                        transport: Transport.REDIS,
                        options: {
                            host: 'localhost',
                            port: 6379,
                        }
                    }
                ])
            ],
            providers: [FilmService],
        }).compile();

        filmService = module.get<FilmService>(FilmService);
    });

    describe('getFilms', () => {
        it('should return an array of films', async () => {
            const films = await filmService.getAllFilms();
            expect(films).toBeDefined();
            expect(Array.isArray(films)).toBe(true);
        });
    });

    var film_id;
    describe('addFilm', () => {
        it('should return an object of films', async () => {
            const data: Film = {
                id: new Date().toDateString(),
                title: 'The Shawshank Redemption',
                director: 'Frank Darabont',
                year: 1994,
                actors: ['ALEX']
            }
            const film = await filmService.addFilm(data);
            film_id = film._id;

            expect(film).toBeInstanceOf(Object);
            expect(film.title).toBeDefined();
            expect(film.director).toBeDefined();
            expect(film.year).toBeDefined();

            // Check that the film was added to the database
            const addedFilm = await filmService.getFilmById(film._id);
            expect(addedFilm).toBeInstanceOf(Object);
            expect(addedFilm.title).toBeDefined();
            expect(addedFilm.director).toBeDefined();
            expect(addedFilm.year).toBeDefined();
        });

        it('should have the correct title and director', async () => {
            const data: Film = {
                id: new Date().toDateString(),
                title: 'The Shawshank Redemption',
                director: 'Frank Darabont',
                year: 1994,
                actors: ['ALEX']
            }

            const addedFilm = await filmService.addFilm(data);

            expect(addedFilm.title).toEqual(data.title);
            expect(addedFilm.director).toEqual(data.director);
        });
    });
});