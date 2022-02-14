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

  type Group {
    id: ID!
    featureSet: GroupFeatureSet
    cars(skip: Int!, take: Int!): [Car!]!
    name: String!
    image: ID!
    description: String!
  }
  type Image {
    id: ID!
    url: String!
  }
  type GroupFeatureSet {
    features: [GroupFeatures!]!
    applyFeaturesSeparately: Boolean!
  }
  type GroupFeatures {
    feature: GroupFeatureFields!
  }
  type Mutations {
    groupDelete(groupId: ID!)
    groupPublish(groupId: ID!)
    groupUnpublish(groupId: ID!)
    groupAddCar(groupId: ID!, carId: ID!)
    groupRemoveCar(groupId: ID!, carId: ID!)
    groupCreate(
      groupInput: GroupInput!
    )
    groupUpdate(
      groupId: ID!
      groupInput: GroupInput!
    ): GroupUpdatePayload
  }
  type GroupUpdatePayload {
    userErrors: [UserErrors!]!
    group: Group
  }
  type UserErrors {
    message: String!
    field: String!
  }
  input GroupInput {
    name: String
    image: ImageInput
    description: String
    featureSet: GroupFeatureFields!
  }
  input ImageInput {
    url: String!
  }
  enum GroupFeatureFields {
    INCLINE_ENGINE
    FOUR_CYLINDER_ENGINE
    TWIN_CYLINDER_ENGINE
    RED_COLOR
    BLACK_COLOR
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
