import { Body, Controller, Post } from "@nestjs/common";
import { User } from "./users.model";
import { UserService } from "./users.service";

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UserService) { }

    @Post()
    register(@Body() createUserReq: User) {
        const userId = this.userService.createUser(createUserReq);
        return { userId };
    }
}