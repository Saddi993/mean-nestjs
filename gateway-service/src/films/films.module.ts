import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';

import { FilmsController } from './films.controller';
import { FilmService } from './films.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [],
  controllers: [FilmsController],
  providers: [FilmService],
})
export class FilmsModule { }