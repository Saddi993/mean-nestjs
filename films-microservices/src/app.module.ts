import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmSchema } from './schema/film.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.oo7vpcm.mongodb.net/nestjs-assessment?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{
      name: 'Film',
      schema: FilmSchema
  }])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
