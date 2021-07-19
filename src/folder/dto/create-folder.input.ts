import { InputType } from "@nestjs/graphql";

@InputType()
export class CreateFolderInput {
  name: string;
}