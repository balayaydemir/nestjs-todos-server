import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todo/todos.module';
import { FoldersModule } from './folder/folders.module';
import { UsersModule } from './user/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TodosModule,
    FoldersModule,
    UsersModule,
    GraphQLModule.forRoot({
      playground: true,
      debug: true,
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
    }),
  ],
})

export class AppModule {}
