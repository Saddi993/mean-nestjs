import { Body, Controller, Post } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { User } from "./users.model";
import { UserService } from "./users.service";

@Controller('users')
export class Users {

    constructor(private readonly userService: UserService) { }

    @EventPattern('user_register')
    handleUserRegister(userData: User) {
        this.userService.createUser(userData);
    }
}