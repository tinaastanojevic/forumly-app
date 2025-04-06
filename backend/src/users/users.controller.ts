import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Get(':id')
    getUserById(@Param('id') id: string) {
        const numId = Number(id);
        return this.usersService.getUserById(numId);
    }

    @Get('username/:username')
    getUserByUsername(@Param('username') username: string) {
        return this.usersService.getUserByUsername(username);
    }

    @Delete(':username/:username')
    deleteUserByUsername(@Param('username') username: string) {
        return this.usersService.deleteUserByUsername(username);
    }
}
