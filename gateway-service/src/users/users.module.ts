import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';

import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { FilmsController } from 'src/films/films.controller';
import { FilmService } from 'src/films/films.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forRoot(),

    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES }
    }),
    ClientsModule.register([
      {
        name: 'USER_MICROSERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        }
      },
      {
        name: 'FILM_MICROSERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        }
      }
    ])
  ],
  controllers: [UsersController, FilmsController],
  providers: [UserService, FilmService],
})
export class UsersModule { }