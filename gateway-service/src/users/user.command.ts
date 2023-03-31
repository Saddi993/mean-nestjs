import { Command, Positional, Option } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './users.model';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserCommand {
    constructor(private readonly userService: UserService) { }

    @Command({
        command: 'create:user',
        describe: 'create a user',
    })
    async create() {

        const hashed = await bcrypt.hash('123456', 12);
        const users: User = {
            id: new Date().toDateString(),
            name: 'John Doe',
            email: 'john.doe@mailinator.com',
            password: hashed,
            age: 23,
            location: 'LA'
        }
        console.log(users);

        await this.userService.createUser(users);
    }
}