import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { Todo } from '../todo/todo.model'

@ObjectType()
@Entity()
export class Folder {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @HideField()
  @OneToMany(() => Todo, todo => todo.folder, { onDelete: "CASCADE" })
  todos?: Todo[];
}