import { Injectable, Logger, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoInput } from './dto/create-todo.input';
import { Todo } from './todo.model';
import { EditTodoInput } from './dto/edit-todo.input';

@Injectable()
export class TodosService {
  logger = new Logger(TodosService.name)
  constructor(
    @InjectRepository(Todo)
    private readonly todosRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoInput): Promise<Todo> {
    try {
      return this.todosRepository.save({
        name: createTodoDto.name,
        description: createTodoDto.description,
        folder: { id: createTodoDto.folderId },
        user: { id: createTodoDto.userId },
      });
    } catch (error) {
      this.logger.error(error)
    }
    return null
  }

  async edit(editTodoDto: EditTodoInput): Promise<Todo> {
    try {
      return this.todosRepository.save( {
        id: editTodoDto.id,
        name: editTodoDto.name,
        description: editTodoDto.description,
        isCompleted: editTodoDto.isCompleted,
        folder: { id: editTodoDto.folderId },
        user: { id: editTodoDto.userId },
      });
    } catch (error) {
      this.logger.error(error)
    }
    return null
  }

  async remove(id: number): Promise<Todo> {
    try {
      const folderToDelete = await this.todosRepository.findOne(id);
      await this.todosRepository.delete(id);
      return folderToDelete;
    } catch (error) {
      this.logger.error(error)
    }
    return null
  }

  async findByFolder(id: number): Promise<Todo[]> {
    try {
      return this.todosRepository
        .createQueryBuilder('todo')
        .where('todo.folder = :id', { id })
        .getMany();
    } catch (error) {
      this.logger.error(error)
    }
    return null
  }

  async findByUser(id: number): Promise<Todo[]> {
    return this.todosRepository
      .createQueryBuilder('todo')
      .where('todo.user = :id', { id })
      .getMany();
  }
}
