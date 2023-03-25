import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Req, Request, UnauthorizedException } from "@nestjs/common";
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
            const token = request.cookies['jwt'];
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

    @Patch(':id')
    async updateFilm(
        @Param('id') id: string,
        @Body('title') title: string,
        @Body('director') director: string,
        @Body('year') year: number,
        @Body('actors') actors: any,
        @Request() request: any
    ) {

        try {
            const token = request.cookies['jwt'];

            await this.jwtService.verify(token);

            await this.filmService.updateFilmById(id, { title, director, year, actors });

            return {
                data: 'success'
            };

        } catch (e) {
            throw new UnauthorizedException;
        }
    }

    @Get(':id')
    async getFilmByID(
        @Param('id') id: string,
        @Request() request: any
    ) {

        try {
            const token = request.cookies['jwt'];

            await this.jwtService.verify(token);

            const film = await this.filmService.getFilmById(id);

            return {
                data: film
            };

        } catch (e) {
            throw new UnauthorizedException;
        }
    }

    @Delete(':id')
    async removeFilm(@Param('id') id: string, @Request() request: any) {

        try {
            const token = request.cookies['jwt'];
            console.log(token);

            await this.jwtService.verify(token);

            await this.filmService.removeFilm(id);

            return {
                data: 'success'
            };

        } catch (e) {
            throw new UnauthorizedException;
        }
    }
}