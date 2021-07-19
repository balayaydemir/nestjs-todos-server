import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Todo } from '../todo/todo.model';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field(() => [Todo], { nullable: true })
  @OneToMany(() => Todo, todo => todo.user, { onDelete: "CASCADE" })
  todos: Todo[];
}
