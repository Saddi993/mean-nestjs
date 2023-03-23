import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';

import { UsersController } from './users.controller';
import { UserService } from './users.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // JwtModule.registerAsync({
    //   inject: [
    //     ConfigService
    //   ],
    //   useFactory: (config: ConfigService) => {
    //     return {
    //       secret: config.get<string>('JWT_SECRET'),
    //       signOptions: {
    //         expiresIn: config.get<string | number>('JWT_EXPIRES'),
    //       },
    //     };
    //   },
    // }),
    ConfigModule.forRoot(),

    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES}
    }),
    ClientsModule.register([
      {
        name: 'USER_MICROSERVICE',
        transport: Transport.TCP,
        options: {
          port: 3001
        }
      }
    ])
  ],
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule { }