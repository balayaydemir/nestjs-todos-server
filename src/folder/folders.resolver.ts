import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { Folder } from './folder.model';
import { FoldersService } from './folders.service';
import { TodosService } from '../todo/todos.service';
import { CreateFolderInput } from './dto/create-folder.input';
import { Todo } from '../todo/todo.model';

@Resolver(() => Folder)
export class FoldersResolver {
  constructor(
    @Inject(FoldersService) private foldersService: FoldersService,
    @Inject(TodosService) private todosService: TodosService,
  ) { }

  @Query(() => Folder)
  async getFolder(@Args('id') id: number): Promise<Folder> {
    return await this.foldersService.findOne(id);
  }

  @Query(() => [Folder])
  async getAllFolders(): Promise<Folder[]> {
    return await this.foldersService.findAll();
  }

  @Mutation(() => Folder)
  async createFolder(@Args('input') input: CreateFolderInput): Promise<Folder> {
    return await this.foldersService.create(input);
  }

  @Mutation(() => Folder)
  async deleteFolder(@Args('id') id: number): Promise<Folder> {
    return await this.foldersService.remove(id);
  }

  @ResolveField(() => [Todo])
  async todos(@Parent() folder) {
    const { id } = folder;
    return this.todosService.findByFolder(id);
  }
}