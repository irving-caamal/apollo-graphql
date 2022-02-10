import { gql } from "apollo-server";

const typeDefs = gql`
    type Product {
        id: ID!
        name: String!
        description: String!
        quantity: Int!
        price: Float!
        onSale: Boolean!
        image: String!
        category: Category!
    }
    type Category {
        id: ID!
        name: String!
        products: [Product!]!
    }
    type Query {
        products: [Product!]!
        product(id: ID!): Product
        categories: [Category!]!
        category(id: ID!): Category
    }
`;

export {
    typeDefs
};