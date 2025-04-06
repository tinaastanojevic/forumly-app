import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/users/user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

import { User } from 'src/entities/user.entity';
import { AuthResponseDto } from 'src/dto/AuthResponse.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
        private jwtService: JwtService) {
    }

    async login(userDto: UserDto): Promise<AuthResponseDto> {

        const user = await this.usersService.getUserByUsername(userDto.username);
        if (!user) {
            throw new NotFoundException('Invalid username');
        }
        const isMatch = await this.comparePasswords(userDto.password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid username or password');
        }
        const token = (await this.generateToken(user)).access_token;
        return {
            id: user.id,
            username: user.username,
            token: token
        } as AuthResponseDto;

    }

    async registerUser(userDto: UserDto): Promise<AuthResponseDto> {
        const user = await this.usersService.getUserByUsername(userDto.username);
        if (user) {
            throw new ConflictException('User already exists. Please log in instead.');
        }
        else {
            const hashedPassword = await this.hashPassword(userDto.password);
            const newUser = await this.usersService.createNewUser({ username: userDto.username, password: hashedPassword });
            const token = (await this.generateToken(newUser)).access_token;
            return {
                id: newUser.id,
                username: newUser.username,
                token: token
            } as AuthResponseDto;
        }
    }

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }
    async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }

    async generateToken(user: User) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }


}
