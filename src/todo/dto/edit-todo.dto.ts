import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class EditTodoDto {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  isCompleted: boolean;

  @Field()
  folderId: number;

  @Field()
  userId: number;
}