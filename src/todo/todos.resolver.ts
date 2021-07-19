import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { Todo } from './todo.model'
import { Folder } from '../folder/folder.model';
import { TodosService } from './todos.service';
import { FoldersService } from '../folder/folders.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { EditTodoDto } from './dto/edit-todo.dto';

@Resolver(() => Todo)
export class TodosResolver {
  constructor(
    @Inject(TodosService) private todosService: TodosService,
    @Inject(FoldersService) private foldersService: FoldersService,
  ) { }

  @Mutation(() => Todo)
  async createTodo(@Args('input') input: CreateTodoDto): Promise<Todo> {
    return await this.todosService.create(input);
  }

  @Mutation(() => Todo)
  async editTodo(@Args('input') input: EditTodoDto): Promise<Todo> {
    return await this.todosService.edit(input);
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
}