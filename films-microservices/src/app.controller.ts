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

  @EventPattern('add_film')
  async handleAddFilm(filmData: any) {
    console.log('MICRO SERVICE - handleUserRegister');
    await this.appService.addFilm(filmData);
  }

  @MessagePattern('get_films')
  async getFilms() {
    console.log('MICRO SERVICE - get_films');
    const data =  await this.appService.getAllFilms();
    console.log(data);
    return data;
  }
}
