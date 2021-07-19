import { TodosModule } from '../todo/todos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { Folder } from './folder.model';
import { FoldersService } from './folders.service';
import { FoldersResolver } from './folders.resolver';


@Module({
  imports: [forwardRef(() => TodosModule), TypeOrmModule.forFeature([Folder])],
  providers: [FoldersService, FoldersResolver],
  exports: [FoldersService]
})
export class FoldersModule {}