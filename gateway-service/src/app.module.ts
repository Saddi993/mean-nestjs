import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmsModule } from './films/films.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
