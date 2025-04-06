import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/users/user.dto';
import { AuthResponseDto } from 'src/dto/AuthResponse.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @Post('login')
    async login(@Body() UserDto: UserDto): Promise<AuthResponseDto> {
        return await this.authService.login(UserDto);
    }

    @Post('register')
    registerUser(@Body() userDto: UserDto): Promise<AuthResponseDto> {
        return this.authService.registerUser(userDto);
    }
}
