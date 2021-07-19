import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Todo } from '../todo/todo.model'

@ObjectType()
@Entity()
export class Folder {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Todo], { nullable: true })
  @OneToMany(() => Todo, todo => todo.folder, { onDelete: "CASCADE" })
  todos: Todo[];
}