import { Body, Controller, Post } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { User } from "./users.model";
import { UserService } from "./users.service";

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UserService) { }

    @EventPattern('user_register')
    handleUserRegister(userData: any) {
        this.userService.createUser(userData);
    }
}