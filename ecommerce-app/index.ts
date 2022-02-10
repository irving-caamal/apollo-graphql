import { ApolloServer } from "apollo-server";

import { typeDefs } from "./schema";
import * as data from './mockdata.json';
import { Query } from "./resolvers/Query";
import { Product } from "./resolvers/Product";
import { Category } from "./resolvers/Category";

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Product,
        Category,
    },
    context: {
        products: data.products,
        categories: data.categories,
    }
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
}); 