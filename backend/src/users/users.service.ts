import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';


@Injectable()
export class UsersService {
  constructor(@InjectRepository(User)
  private userRepository: Repository<User>) {
  }

  async getUserById(id: number): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    return user || null;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ username });
    return user || null;
  }

  async deleteUserByUsername(username: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ username });
    if (!user)
      throw new NotFoundException('User not found');

    await this.userRepository.remove(user);
  }

  async createNewUser(newUser: UserDto): Promise<User> {
    const user = this.userRepository.create({ username: newUser.username, password: newUser.password, posts: [], comments: [] });
    await this.userRepository.save(user);
    return user;
  }
}
