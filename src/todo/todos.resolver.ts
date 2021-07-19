import { Args, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { Todo } from './todo.model'
import { Folder } from '../folder/folder.model';
import { TodosService } from './todos.service';
import { FoldersService } from '../folder/folders.service';
import { UsersService } from '../user/users.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { EditTodoDto } from './dto/edit-todo.dto';
import { User } from '../user/user.model';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => Todo)
export class TodosResolver {
  constructor(
    @Inject(TodosService) private todosService: TodosService,
    @Inject(FoldersService) private foldersService: FoldersService,
    @Inject(UsersService) private usersService: UsersService,
  ) { }

  @Mutation(() => Todo)
  async createTodo(@Args('input') input: CreateTodoDto): Promise<Todo> {
    const newTodo = await this.todosService.create(input)
    await pubSub.publish('todoAdded', { todoAdded: newTodo });
    return newTodo;
  }

  @Mutation(() => Todo)
  async editTodo(@Args('input') input: EditTodoDto): Promise<Todo> {
    const editedTodo = await this.todosService.edit(input);
    if (editedTodo.isCompleted)
      await pubSub.publish('todoCompleted', { todoCompleted: editedTodo })
    return editedTodo;
  }

  @Mutation(() => Todo)
  async deleteTodo(@Args('id') id: number): Promise<Todo> {
    return await this.todosService.remove(id);
  }

  @ResolveField(() => Folder)
  async folder(@Parent() todo): Promise<Folder> {
    const { folder } = todo;
    return this.foldersService.findOne(folder);
  }

  @ResolveField(() => User)
  async user(@Parent() todo): Promise<User> {
    const { user } = todo;
    return this.usersService.findOne(user);
  }

  @Subscription(() => Todo, {
    name: 'todoAdded',
    filter: (payload, variables) =>
      payload.todoAdded.user.id !== variables.userId,
  })
  addTodoHandler(@Args('userId') userId: number) {
    return pubSub.asyncIterator('todoAdded');
  }

  @Subscription(() => Todo, {
    name: 'todoCompleted',
    filter: (payload, variables) =>
      payload.todoAdded.user.id !== variables.userId,
  })
  completeTodoHandler(@Args('userId') userId: number) {
    return pubSub.asyncIterator('todoCompleted')
  }
}