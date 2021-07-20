import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFolderInput } from './dto/create-folder.input';
import { Folder } from './folder.model'

@Injectable()
export class FoldersService {
  logger = new Logger(FoldersService.name)
  constructor(
    @InjectRepository(Folder)
    private readonly foldersRepository: Repository<Folder>,
  ) {}

  async create(createFolderDto: CreateFolderInput): Promise<Folder> {
    try {
      return this.foldersRepository.save({ name: createFolderDto.name });
    } catch (error) {
      this.logger.error(error)
    }

    return null
  }

  async findAll(): Promise<Folder[]> {
    try {
      return this.foldersRepository.find();
    } catch (error) {
      this.logger.error(error)
    }
    return null
  }

  async findOne(id: number): Promise<Folder> {
    try {
      return this.foldersRepository.findOne(id);
    } catch (error) {
      this.logger.error(error)
    }
    return null
  }

  async remove(id: number): Promise<Folder> {
    try {
      const folderToDelete = await this.foldersRepository.findOne(id);
      await this.foldersRepository.delete(id);
      return folderToDelete;
    } catch (error) {
      this.logger.error(error)
    }
    return null
  }
}