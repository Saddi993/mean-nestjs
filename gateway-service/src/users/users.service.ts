import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from './users.model';

@Injectable()
export class UserService {

    constructor (@Inject('USER_MICROSERVICE') private readonly userMicroServiceClient: ClientProxy) {}

    createUser(createUserReq: User) {
        // this.userMicroServiceClient.emit('user_register', createUserReq);
        // return new Date().toString()
        return this.userMicroServiceClient.send<any>('user_register', createUserReq).toPromise();
    }

    getUserByEmail(email: string, password: string) {
        return this.userMicroServiceClient.send<any>('get_user_by_email', { email, password }).toPromise();
    }
}