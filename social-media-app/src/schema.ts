import { gql } from 'apollo-server';

const typeDefs = gql`
    type Query {
        posts: [Post!]!
    }
    type Post {
        id: ID!
        title: String!
        content: String!
        createdAt: String!
        published: Boolean!
        user: User!
    }
    type User {
        id: ID!
        name: String!
        email: String!
        profile: Profile!
        post: [Post!]!
    }
    type Profile {
        id: ID!
        bio: String!
        user: User!
    }
    type Mutation {
        postCreate(post: PostInput!): PostPayload!
        postUpdate(postId: ID!, post: PostInput!): PostPayload!
    }
    input PostInput {
        title: String
        content: String
        published: Boolean
    }
    type PostPayload {
        userErrors: [UserError!]!
        post: Post
    }
    type UserError {
        message: String!
    }
`;

export {
    typeDefs,
};