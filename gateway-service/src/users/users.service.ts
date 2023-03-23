import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from './users.model';

@Injectable()
export class UserService {

    constructor (@Inject('USER_MICROSERVICE') private readonly userMicroServiceClient: ClientProxy) {}

    createUser(createUserReq: User) {
        console.log(createUserReq);
        this.userMicroServiceClient.emit('user_register', createUserReq);
        return new Date().toString()
    }
}