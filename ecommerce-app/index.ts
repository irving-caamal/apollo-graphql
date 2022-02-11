import { ApolloServer } from "apollo-server";

import { typeDefs } from "./schema";
import { Query } from "./resolvers/Query";
import { Product } from "./resolvers/Product";
import { Category } from "./resolvers/Category";
import { Review } from "./resolvers/Review";
import { Mutation } from "./resolvers/Mutation";
import * as db from './mockedData.json';

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Product,
        Category,
        Review, 
        Mutation,
    },
    context: {
        db
    }
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
}); 