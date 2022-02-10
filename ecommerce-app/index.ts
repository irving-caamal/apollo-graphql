import { ApolloServer } from "apollo-server";

import { typeDefs } from "./schema";
import { Query } from "./resolvers/Query";
import { Product } from "./resolvers/Product";
import { Category } from "./resolvers/Category";
import { Review } from "./resolvers/Review";
import * as data from './mockdata.json';

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Product,
        Category,
        Review, 
    },
    context: {
        products: data.products,
        categories: data.categories,
        reviews: data.reviews,
    }
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
}); 