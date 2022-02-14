import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    cars: [Car!]!
  }

  type Car {
    id: ID!
    color: String!
    make: String!
  }

  type ManualGroup {
    id: ID!
    name: String!
    bodyHtml: String!
    image: String!
    memberships: [GroupMembership!]!
  }

  type AutomaticGroup {
    id: ID!
    name: String!
    bodyHtml: String!
    image: String!
    feature: [AutomaticGroupFeatures!]!
    memberships: [GroupMembership!]!
    applyFeaturesSeparately: Boolean!
  }

  type AutomaticGroupFeatures {
    column: String!
  }

  type GroupMembership {
    groupId: ID!
    carID: ID!
  }

`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      cars: () => [{ id: 1, color: "blue", make: "Toyota" }],
    },
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
