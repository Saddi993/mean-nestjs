import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('add_film')
  async handleAddFilm(filmData: any) {
    console.log('MICRO SERVICE - handleAddFilm');
    return await this.appService.addFilm(filmData);
  }

  @MessagePattern('get_films')
  async getFilms() {
    console.log('MICRO SERVICE - get_films');
    const data =  await this.appService.getAllFilms();
    return data;
  }

  @MessagePattern('update_films')
  async updateFilms(data: any) {
    console.log('MICRO SERVICE - update_films');
    return await this.appService.updateByID(data.id, data.updatedFilm);
  }

  @MessagePattern('remove_films')
  async removeFilms(filmData: any) {
    console.log('MICRO SERVICE - remove_films', filmData);
    const data =  await this.appService.removeFilm(filmData.id);
    return data;
  }
}
