import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from './users.model';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor (@Inject('USER_MICROSERVICE') private readonly userMicroServiceClient: ClientProxy) {}

    async createUser(createUserReq: User) {
        
        const hashedPassword = await bcrypt.hash(createUserReq.password, 12);
        createUserReq.password = hashedPassword;

        this.userMicroServiceClient.emit('user_register', createUserReq);
        return new Date().toString()
    }
}