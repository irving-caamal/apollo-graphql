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
        postCreate(title: String!, content: String!, published: Boolean!): PostPayload!
        postUpdate(id: ID!, title: String!, content: String!, published: Boolean!): PostPayload!
    }
    type PostPayload {
        userErrors: [UserError!]!
        post: Post!
    }
    type UserError {
        message: String!
    }
`;

export {
    typeDefs,
};