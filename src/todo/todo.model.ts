import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Folder } from '../folder/folder.model'
import { User } from '../user/user.model';
import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Todo {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: false })
  isCompleted: boolean

  @HideField()
  @ManyToOne(() => Folder, folder => folder.todos, { onDelete: "CASCADE" })
  folder: Folder;

  @HideField()
  @ManyToOne(() => User, user => user.todos, { onDelete: "CASCADE" })
  user: User;
}
