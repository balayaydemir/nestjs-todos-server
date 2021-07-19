import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './user.model';


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersResolver],
  exports: [UsersService]
})
export class UsersModule {}