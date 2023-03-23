import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Film } from './schema/film.schema';

@Injectable()
export class AppService {

  constructor (@InjectModel('Film') private readonly filmModel: Model<Film>) {}
  
  getHello(): string {
    return 'Hello World!';
  }
  
  addFilm(data: any) {
    console.log(data);
    this.filmModel.create(data);
  }
}
