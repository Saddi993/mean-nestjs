import { Body, Controller, Post } from "@nestjs/common";
import { EventPattern, MessagePattern } from "@nestjs/microservices";
import { Film } from "./films.model";
import { FilmService } from "./films.service";

@Controller('films')
export class FilmsController {

    constructor(private readonly filmService: FilmService) { }

    @EventPattern('add_film')
    handleUserRegister(filmData: any) {
        this.filmService.createFilm(filmData);
    }

    @MessagePattern({ cmd: 'get_all_films' })
    async handleGetUserByEmail() {
        console.log('MICRO SERVICE - get_all_films');
        return await this.filmService.getFilms();
    }
}