import { BadRequestException, Body, Controller, Post, Response } from "@nestjs/common";
import { User } from "./users.model";
import { UserService } from "./users.service";

import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Controller('users')
export class UsersController {

    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) { }

    @Post()
    async register(@Body() createUserReq: User) {

        const hashedPassword = await bcrypt.hash(createUserReq.password, 12);
        createUserReq.password = hashedPassword;

        const data = await this.userService.createUser(createUserReq);
        return { _id: data._id };
    }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Response({ passthrough: true }) response: any
    ) {
        console.log('in login')
        const hashedPassword = await bcrypt.hash(password, 12);
        const user: any = await this.userService.getUserByEmail(email, hashedPassword);
        console.log(user);

        if (!user._id) {
            throw new BadRequestException('invalid credentials');
        }
        console.log(user)
        console.log(user._id , 'id');
        const jwt = await this.jwtService.sign({ id: user._id });

        response.cookie('jwt', jwt, { httpOnly: true });

        return {
            message: jwt
        };
    }
}