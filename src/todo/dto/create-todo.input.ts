import { InputType } from "@nestjs/graphql";

@InputType()
export class CreateTodoInput {
  name: string;

  description: string;

  folderId: number;

  userId: number;
}