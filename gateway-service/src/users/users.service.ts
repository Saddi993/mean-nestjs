import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from './users.model';

@Injectable()
export class UserService {

    constructor (@Inject('USER_MICROSERVICE') private readonly userMicroServiceClient: ClientProxy) {}

    async createUser(createUserReq: User) {
        this.userMicroServiceClient.emit('user_register', createUserReq);
        return new Date().toString()
    }

    getUserByEmail(email: string, password: string) {
        console.log('getUserByEmail')
        
        return this.userMicroServiceClient.send({ cmd: 'get_user_by_email' }, { email, password });
    }
}