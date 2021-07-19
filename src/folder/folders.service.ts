import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFolderInput } from './dto/create-folder.input';
import { Folder } from './folder.model'

@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(Folder)
    private readonly foldersRepository: Repository<Folder>,
  ) {}

  async create(createFolderDto: CreateFolderInput): Promise<Folder> {
    const folder = new Folder();
    folder.name = createFolderDto.name;

    return this.foldersRepository.save(folder);
  }

  async findAll(): Promise<Folder[]> {
    return this.foldersRepository.find();
  }

  async findOne(id: number): Promise<Folder> {
    return this.foldersRepository.findOne(id);
  }

  async remove(id: number): Promise<Folder> {
    const folderToDelete = await this.foldersRepository.findOne(id);
    await this.foldersRepository.delete(id);
    return folderToDelete;
  }
}