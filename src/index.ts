import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import jwt from "jsonwebtoken";

import { authChecker, authenticate } from "./auth";
import { UserResolver } from "./resolvers/user";
import { SECRET } from "./config";
const PORT = 4000;
const HEADER_NAME = "authorization";

async function main() {
  await createConnection();
  const schema = await buildSchema({
    resolvers: [UserResolver],
    validate: false,
    authChecker,
  });
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      //let authToken = null;
      //let user = null;
      try {
        /* authToken = req.headers[HEADER_NAME];

        if (authToken) {
          user = await jwt.verify(authToken, SECRET); 
        } */
        const { token, user } = await authenticate(req);

        if (user) {
          return { token, user };
        }
      } catch (e) {
        console.log(e);
        console.warn(`Unable to authenticate`);
      }
    },
  });
  const { url } = await server.listen(PORT);
  console.log(`Server is running: ${url}`);
}

main();
