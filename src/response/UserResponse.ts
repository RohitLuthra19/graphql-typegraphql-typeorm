import { ObjectType, Field } from "type-graphql";

import { FieldError } from "./FieldError";
import { User } from "../models/user";

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;

  @Field({ nullable: true })
  token?: String;
}
