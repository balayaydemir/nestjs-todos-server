import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { FoldersModule } from '../folder/folders.module';
import { Todo } from './todo.model'
import { TodosService } from './todos.service';
import { TodosResolver } from './todos.resolver';
import { UsersModule } from '../user/users.module';


@Module({
  imports: [forwardRef(() => FoldersModule), forwardRef(() => UsersModule), TypeOrmModule.forFeature([Todo])],
  providers: [TodosService, TodosResolver],
  exports: [TodosService]
})
export class TodosModule {}