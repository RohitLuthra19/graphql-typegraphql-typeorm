import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

import { UserResolver } from "./resolvers/user";
const PORT = 4000;

async function main() {
  await createConnection();
  const schema = await buildSchema({
    resolvers: [UserResolver],
    validate: false,
  });
  const server = new ApolloServer({ schema });
  await server.listen(PORT);
  console.log(`Server has started on PORT: ${PORT}`);
}

main();
