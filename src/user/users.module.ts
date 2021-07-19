import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TodosModule } from '../todo/todos.module';
import { User } from './user.model';


@Module({
  imports: [forwardRef(() => TodosModule), TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersResolver],
  exports: [UsersService]
})
export class UsersModule {}