import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Folder } from '../folder/folder.model'
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Todo {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column({ default: false })
  isCompleted: boolean

  @Field(() => Folder, { nullable: false })
  @ManyToOne(() => Folder, folder => folder.todos, { onDelete: "CASCADE" })
  folder: Folder;
}
