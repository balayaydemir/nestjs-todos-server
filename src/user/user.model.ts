import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { Todo } from '../todo/todo.model';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @HideField()
  @OneToMany(() => Todo, todo => todo.user, { onDelete: "CASCADE" })
  todos?: Todo[];
}
