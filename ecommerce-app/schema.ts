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
        category: Category
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
        product: Product!
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
        addReview(input: AddReviewInput): Review!
        deleteCategory(id: ID!): Boolean!
        deleteProduct(id: ID!): Boolean!
        deleteReview(id: ID!): Boolean!
        updateCategory(id: ID!, input: UpdateCategoryInput): Category!
    }
    input AddCategoryInput {
        name: String!
    }
    input UpdateCategoryInput {
        name: String!
    }
    input AddProductInput {
        name: String!
        description: String!
        quantity: Int!
        price: Float!
        onSale: Boolean!
        image: String!
        categoryId: ID!
    }
    input AddReviewInput {
        date: String!
        comment: String!
        rating: Int!
        productId: ID!
    }
    input ProductsFilerInput {
        onSale: Boolean!
        avgRating: Int
    }
`;

export {
    typeDefs
};