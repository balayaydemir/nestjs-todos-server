import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.model';

@Injectable()
export class UsersService {
  logger = new Logger()
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserInput): Promise<User> {
    try {
      return this.usersRepository.save({
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
      });
    } catch (error) {
      this.logger.error(error)
    }
  }

  findOne(id: number): Promise<User> {
    try {
      return this.usersRepository.findOne(id);
    } catch (error) {
      this.logger.error(error)
    }
    return null
  }

  async remove(id: number): Promise<User> {
    try {
      const userToDelete = await this.usersRepository.findOne(id);
      await this.usersRepository.delete(id);
      return userToDelete;
    } catch (error) {
      this.logger.error(error)
    }
    return null
  }
}
