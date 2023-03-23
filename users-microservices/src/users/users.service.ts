import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from './users.model';

@Injectable()
export class UserService {

    constructor () {}

    createUser(createUserReq: User) {
        console.log('User Microservice - COMMUNICATIONS', createUserReq);
    }
}