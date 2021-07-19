import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateTodoDto {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  folderId: number;

  @Field()
  userId: number;
}