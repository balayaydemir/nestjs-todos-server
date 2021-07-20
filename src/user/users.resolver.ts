import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from './user.model'
import { Inject, PreconditionFailedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { TodosService } from '../todo/todos.service';
import { CreateUserInput } from './dto/create-user.input';
import { Todo } from '../todo/todo.model';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    @Inject(UsersService) private usersService: UsersService,
    @Inject(TodosService) private todosService: TodosService,
  ) { }

  @Query(() => User)
  async user(@Args('id') id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) throw new PreconditionFailedException()
    return user
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    const user = await this.usersService.create(input);
    if (!user) throw new PreconditionFailedException()
    return user
  }

  @ResolveField(() => [Todo])
  async todos(@Parent() user) {
    const { id } = user;
    return this.todosService.findByUser(id);
  }
}