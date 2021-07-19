import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.model'
import { Inject } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    @Inject(UsersService) private usersService: UsersService,
  ) { }

  @Query(() => User)
  async user(@Args('id') id: number): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserDto): Promise<User> {
    return await this.usersService.create(input);
  }
}