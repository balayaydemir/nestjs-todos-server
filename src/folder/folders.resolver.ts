import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Inject, PreconditionFailedException } from '@nestjs/common';
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
    const folder = await this.foldersService.findOne(id);
    if (!folder) throw new PreconditionFailedException()
    return folder
  }

  @Query(() => [Folder])
  async getAllFolders(): Promise<Folder[]> {
    const folders = await this.foldersService.findAll();
    if (!folders) throw new PreconditionFailedException()
    return folders
  }

  @Mutation(() => Folder)
  async createFolder(@Args('input') input: CreateFolderInput): Promise<Folder> {
    const folder = await this.foldersService.create(input);
    if (!folder) throw new PreconditionFailedException()
    return folder
  }

  @Mutation(() => Folder)
  async deleteFolder(@Args('id') id: number): Promise<Folder> {
    const deleted = await this.foldersService.remove(id);
    if (!deleted) throw new PreconditionFailedException()
    return deleted
  }

  @ResolveField(() => [Todo])
  async todos(@Parent() folder) {
    const { id } = folder;
    return this.todosService.findByFolder(id);
  }
}