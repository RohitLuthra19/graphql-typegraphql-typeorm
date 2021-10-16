import { AuthenticationError } from "apollo-server";
import { AuthChecker } from "type-graphql";
import jwt from "jsonwebtoken";

import { User } from "../models/user";
import { SECRET } from "../config";

export interface Context {
  user?: User;
}

export const authChecker: AuthChecker<Context> = ({ context: { user } }) => {
  if (!user) {
    return false;
  }
  if (user?.role === "admin") {
    // grant access if the role is admin
    return true;
  }

  return true;
};

export const getUserInfoFromToken = async (accessToken: any) => {
  return await jwt.verify(accessToken, SECRET);
};

const getUserDetails = async (userDetail: any) => {
  return User.findOne({ where: { id: userDetail?.id } });
};

const getUser = async (req: { headers: { authorization: any } }) => {
  try {
    const [, token] = (req?.headers?.authorization || "").split("Bearer ");
    if (!token) throw new AuthenticationError("Token missing");
    const userInfo = await getUserInfoFromToken(token);
    if (userInfo) {
      return { user: await getUserDetails(userInfo), token };
    }
    return { token };
  } catch (error) {
    throw new AuthenticationError(`${error}`);
  }
};

export const authenticate = async (req: any) => getUser(req);
