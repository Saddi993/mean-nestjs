import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) { }

  @EventPattern('add_film')
  async handleAddFilm(filmData: any) {
    console.log('MICRO SERVICE - handleUserRegister');
    await this.appService.addFilm(filmData);
  }
}
