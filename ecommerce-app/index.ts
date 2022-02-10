import { ApolloServer, gql } from "apollo-server";
import { IResolvers } from "@graphql-tools/utils";
import * as data from './mockdata.json';

const typeDefs = gql`
    type Product {
        id: ID!
        name: String!
        description: String!
        quantity: Int!
        price: Float!
        onSale: Boolean!
        image: String!
    }
    type Category {
        id: ID!
        name: String!
    }
    type Query {
        products: [Product!]!
        product(id: ID!): Product
        categories: [Category!]!
        category(id: ID!): Category
    }
`;
const resolvers: IResolvers = {
    Query: {
        products: () => data.products,
        product: (parent,args, context) => {
            return data.products.find(product => product.id === args.id);
        },
        categories: (parent, args, context) => {
            return data.categories; 
        },
        category: (parent, args, context) => {
            const { id } = args;
            return data.categories.find(category => category.id === id);
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
}); 