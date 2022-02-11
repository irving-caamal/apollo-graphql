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
        reviews: [Review!]!
    }
    type Category {
        id: ID!
        name: String!
        products(filter: ProductsFilerInput): [Product!]!
    }
    type Review {
        id: ID!
        date: String!
        comment: String!
        rating: Int!  
    }
    type Query {
        products(filter: ProductsFilerInput): [Product!]!
        product(id: ID!): Product
        categories: [Category!]!
        category(id: ID!): Category
    }
    type Mutation {
        addCategory(input: AddCategoryInput): Category!
        addProduct(input: AddProductInput): Product!
    }
    input AddCategoryInput {
        name: String!
    }
    input AddProductInput {
        name: String!
        description: String!
        quantity: Int!
        price: Float!
        onSale: Boolean!
        image: String!
        categoryId: String!
    }
    input ProductsFilerInput {
        onSale: Boolean!
        avgRating: Int
    }
`;

export {
    typeDefs
};