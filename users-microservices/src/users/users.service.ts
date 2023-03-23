import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.model';

@Injectable()
export class UserService {

    constructor (@InjectModel('User') private readonly userModel: Model<User>) {}

    async createUser(createUserReq: User) {
        console.log('User Microservice - COMMUNICATIONS', createUserReq);
        await this.userModel.create(createUserReq);
        
    }

    async getUserByEmail(user: User) {
        const data = await this.userModel.findOne({ email: user.email });

        console.log(data);
        return data;
    }
}