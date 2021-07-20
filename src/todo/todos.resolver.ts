import { Args, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql';
import { Inject, PreconditionFailedException } from '@nestjs/common';
import { Todo } from './todo.model'
import { Folder } from '../folder/folder.model';
import { TodosService } from './todos.service';
import { FoldersService } from '../folder/folders.service';
import { UsersService } from '../user/users.service';
import { CreateTodoInput } from './dto/create-todo.input';
import { EditTodoInput } from './dto/edit-todo.input';
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
  async createTodo(@Args('input') input: CreateTodoInput): Promise<Todo> {
    const newTodo = await this.todosService.create(input)
    if (!newTodo) throw new PreconditionFailedException()
    await pubSub.publish('todoAdded', { todoAdded: newTodo });
    return newTodo;
  }

  @Mutation(() => Todo)
  async editTodo(@Args('input') input: EditTodoInput): Promise<Todo> {
    const editedTodo = await this.todosService.edit(input);
    if (!editedTodo) throw new PreconditionFailedException()
    await pubSub.publish('todoEdited', { todoEdited: editedTodo })
    return editedTodo;
  }

  @Mutation(() => Todo)
  async deleteTodo(@Args('id') id: number): Promise<Todo> {
    const deletedTodo = await this.todosService.remove(id);
    if (!deletedTodo) throw new PreconditionFailedException()
    await pubSub.publish('todoDeleted', { todoDeleted: deletedTodo })
    return deletedTodo
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
    name: 'todoDeleted'
  })
  deleteTodoHandler() {
    return pubSub.asyncIterator('todoDeleted');
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
    name: 'todoEdited',
    filter: (payload, variables) =>
      payload.todoEdited.user.id !== variables.userId,
  })
  editTodoHandler(@Args('userId') userId: number) {
    return pubSub.asyncIterator('todoEdited')
  }
}