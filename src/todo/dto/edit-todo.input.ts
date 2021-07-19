import { InputType } from "@nestjs/graphql";

@InputType()
export class EditTodoInput {
  id: number;

  name: string;

  description: string;

  isCompleted: boolean;

  folderId: number;

  userId: number;
}