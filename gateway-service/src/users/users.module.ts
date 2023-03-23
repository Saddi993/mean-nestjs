import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { UsersController } from './users.controller';
import { UserService } from './users.service';

@Module({
    imports: [
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