import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from './user.model'
import { Inject } from '@nestjs/common';
import { UsersService } from './users.service';
import { TodosService } from '../todo/todos.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Todo } from '../todo/todo.model';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    @Inject(UsersService) private usersService: UsersService,
    @Inject(TodosService) private todosService: TodosService,
  ) { }

  @Query(() => User)
  async user(@Args('id') id: number): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserDto): Promise<User> {
    return await this.usersService.create(input);
  }

  @ResolveField(() => [Todo])
  async todos(@Parent() user) {
    const { id } = user;
    return this.todosService.findByUser(id);
  }
}