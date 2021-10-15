import { InputType, Field } from "type-graphql";

@InputType()
export class CreateUserInput {
  @Field({ nullable: true })
  role: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
