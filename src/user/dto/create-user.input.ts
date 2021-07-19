import { InputType } from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
  firstName: string;

  lastName: string;
}