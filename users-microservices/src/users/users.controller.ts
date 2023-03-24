import { Body, Controller, Post } from "@nestjs/common";
import { EventPattern, MessagePattern } from "@nestjs/microservices";
import { User } from "./users.model";
import { UserService } from "./users.service";

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UserService) { }

    @MessagePattern('user_register')
    async handleUserRegister(userData: any) {
        return await this.userService.createUser(userData);
    }

    @MessagePattern('get_user_by_email')
    async handleGetUserByEmail(userData: any) {
        console.log('MICRO SERVICE - get_user_by_email', userData);
        return await this.userService.getUserByEmail(userData);
    }
}