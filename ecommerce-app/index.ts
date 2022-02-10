import { ApolloServer } from "apollo-server";
import { IResolvers } from "@graphql-tools/utils";

import { typeDefs } from "./schema";

import { Query } from "./resolvers/Query";
import { Product } from "./resolvers/Product";
import { Category } from "./resolvers/Category";

const resolvers: IResolvers = {
    Query,
    Product,
    Category,
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
}); 