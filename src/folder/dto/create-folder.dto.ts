import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateFolderDto {
  @Field()
  name: string;
}