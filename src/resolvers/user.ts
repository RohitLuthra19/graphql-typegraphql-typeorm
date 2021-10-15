import { Resolver, Query, Mutation, Arg } from "type-graphql";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

import { User } from "../models/user";
import { CreateUserInput } from "../inputs/CreateUserInput";
import { UpdateUserInput } from "../inputs/UpdateUserInput";
import { UserResponse } from "../response/UserResponse";
import { SECRET } from "../config";
@Resolver()
export class UserResolver {
  @Query(() => [User])
  users() {
    return User.find();
  }

  @Query(() => User)
  user(@Arg("id") id: string) {
    return User.findOne({ where: { id } });
  }

  @Mutation(() => User)
  async createUser(@Arg("data") data: CreateUserInput) {
    try {
      const password = await argon2.hash(data?.password);
      /* const user = User.create(data);
      await user.save(); */
      const user = User.create({
        email: data?.email,
        password,
      }).save();
      return user;
    } catch (err) {
      throw new Error(`Error:  ${err}`);
    }
  }

  @Mutation(() => User)
  async updateUser(@Arg("id") id: string, @Arg("data") data: UpdateUserInput) {
    const user = await User.findOne({ where: { id } });
    if (!user) throw new Error("User not found!");
    Object.assign(user, data);
    await user.save();
    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: string) {
    const user = await User.findOne({ where: { id } });
    if (!user) throw new Error("User not found!");
    await user.remove();
    return true;
  }

  @Mutation(() => UserResponse)
  async login(@Arg("email") email: string, @Arg("password") password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return {
        errors: [{ field: "email", message: "Email doesn't exist" }],
      };
    }
    const valid = await argon2.verify(user?.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Password incorrect!",
          },
        ],
      };
    }

    const token = await jwt.sign(
      {
        email: user?.email,
        id: user?.id,
      },
      SECRET /* , { expiresIn: "1d" } */
    );
    return { user, token };
  }
}
