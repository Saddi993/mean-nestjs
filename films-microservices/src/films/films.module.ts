import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';

import { FilmsController } from './films.controller';
import { FilmSchema } from './films.model';
import { FilmService } from './films.service';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: 'films',
            schema: FilmSchema
        }])
    ],
    controllers: [FilmsController],
    providers: [FilmService],
})
export class FilmsModule { }