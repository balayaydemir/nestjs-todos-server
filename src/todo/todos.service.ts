import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todo.model';
import { FoldersService } from '../folder/folders.service';
import { EditTodoDto } from './dto/edit-todo.dto';
import { UsersService } from '../user/users.service';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todosRepository: Repository<Todo>,
    private foldersService: FoldersService,
    private usersService: UsersService,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = new Todo();
    const folder = await this.foldersService.findOne(createTodoDto.folderId);
    const user = await this.usersService.findOne(createTodoDto.userId);
    todo.name = createTodoDto.name;
    todo.description = createTodoDto.description;
    todo.folder = folder;
    todo.user = user;

    return this.todosRepository.save(todo);
  }

  async edit(editTodoDto: EditTodoDto): Promise<Todo> {
    const folder = await this.foldersService.findOne(editTodoDto.id);
    const user = await this.usersService.findOne(editTodoDto.userId)
    await this.todosRepository.update(editTodoDto.id, {
      name: editTodoDto.name,
      description: editTodoDto.description,
      isCompleted: editTodoDto.isCompleted,
      folder: folder,
      user: user,
    });
    return this.todosRepository.findOne(editTodoDto.id);
  }

  async remove(id: number): Promise<Todo> {
    const folderToDelete = await this.todosRepository.findOne(id);
    await this.todosRepository.delete(id);
    return folderToDelete;
  }

  async findByFolder(id: number): Promise<Todo[]> {
    return this.todosRepository
      .createQueryBuilder('todo')
      .where('todo.folder = :id', { id })
      .getMany();
  }

  async findByUser(id: number): Promise<Todo[]> {
    return this.todosRepository
      .createQueryBuilder('todo')
      .where('todo.user = :id', { id })
      .getMany();
  }
}
