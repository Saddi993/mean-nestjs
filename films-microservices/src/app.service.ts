import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Film } from './schema/film.schema';

@Injectable()
export class AppService {

  constructor(@InjectModel('Film') private readonly filmModel: Model<Film>) { }

  getHello(): string {
    return 'Hello World!';
  }

  async addFilm(data: any) {
    return await this.filmModel.create(data);
  }

  async getAllFilms() {
    return await this.filmModel.find();
  }

  async removeFilm(id) {
    await this.filmModel.deleteOne({ _id: id });
  }
}
