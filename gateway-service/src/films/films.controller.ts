import { BadRequestException, Body, Controller, Get, NotFoundException, Post, Req, Request, UnauthorizedException } from "@nestjs/common";
import { Film } from "./films.model";
import { FilmService } from "./films.service";

import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Controller('films')
export class FilmsController {

    constructor(
        private readonly filmService: FilmService,
        private jwtService: JwtService
    ) { }
    
    @Post()
    async addFilm(@Body() data: Film, @Request() request: any) {

        try {
            console.log(request)
            const token = request.cookies['jwt'];

            console.log(token, '-------------------------');
            await this.jwtService.verify(token);

            await this.filmService.addFilm(data);
            return { message: 'success' };
        } catch (e) {
            throw new UnauthorizedException;
        }
    }

    @Get()
    async getFilms(@Request() request: any) {

        try {
            const token = request.cookies['jwt'];

            await this.jwtService.verify(token);

            const films: any = await this.filmService.getAllFilms();
            console.log(films);
            if (!films) {
                throw new NotFoundException('not found');
            }

            return {
                data: films
            };

        } catch (e) {
            throw new UnauthorizedException;
        }
    }
}