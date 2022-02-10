import { gql, ApolloServer, UserInputError } from 'apollo-server';
import {v4 as uuid } from 'uuid';
const persons =[{
    "phone": "700-310-7274",
    "street": "50354 East Place",
    "city": "Naifaru",
    "id": "0cb8fbcc-e1af-4630-8137-2fb46fa129ac",
    "name": "Gabriell Zelley"
  }, {
    "phone": "136-276-9691",
    "street": "2 6th Circle",
    "city": "Kumbo",
    "id": "8efd0148-977b-4db3-9573-9aceea2096d7",
    "name": "Feliks Stride"
  }, {
    "phone": "868-461-6732",
    "street": "996 Kennedy Center",
    "city": "Mondoteko",
    "id": "b82c4243-cc6d-4699-ad4f-9fbae98de1c5",
    "name": "Thedrick Caughtry"
  }, {
    "phone": "512-406-0993",
    "street": "30 Paget Street",
    "city": "Austin",
    "id": "2b105bd2-c362-4b41-ad79-8681164baf53",
    "name": "Fredi Faulds"
  }, {
    "phone": "670-991-1899",
    "street": "959 Union Drive",
    "city": "Delft",
    "id": "0b9d9cd5-0531-4fd6-9cdb-e04f1e0237d6",
    "name": "Stormy Scotchmer"
  }, {
    "phone": "726-612-4927",
    "street": "3376 Bluejay Way",
    "city": "Xiangrong",
    "id": "dae3282e-2106-4cb8-b0b4-92031fc0a943",
    "name": "Jillana Areles"
  }, {
    "phone": "679-260-8259",
    "street": "3823 Superior Hill",
    "city": "Voinjama",
    "id": "95c3cfbd-148f-453c-9342-9c82f008e694",
    "name": "Alex Paoli"
  }, {
    "phone": "348-547-8923",
    "street": "50 Weeping Birch Avenue",
    "city": "Alak",
    "id": "7b7eded4-1aff-4098-83d6-81eb60d80fe8",
    "name": "Joyann Tootin"
  }, {
    "phone": "622-804-3400",
    "street": "156 Brown Trail",
    "city": "Marugame",
    "id": "c9c9eee3-14dc-4a28-9d56-0cd649273848",
    "name": "Stavros Biasio"
  }, {
    "phone": "358-454-0106",
    "street": "15956 Delaware Junction",
    "city": "Stanišić",
    "id": "a393e7b8-6c11-4481-9bd5-a25eac3a4fc2",
    "name": "Mavra Sijmons"
  }]

const typeDefs = gql`
    type Address {
        street: String
        city: String
    }
    type Person {
        name: String!
        phone: String
        street: String!
        address: Address!
        city: String!
        id: ID!
        isValid: Boolean!
    }
    type Query {
        personCount: Int!
        allPersons: [Person]!
        findPerson(name: String!): Person
    }
    type Mutation {
      addPerson(
        name: String!
        phone: String
        street: String!
        city: String!
      ): Person
    }
`
const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons,
    findPerson: (root, args ) => {
      const { name } = args
      return persons.find(person => person.name === name);
    },  
  },
  Mutation: {
    addPerson(root, args) {
      if (persons.find(person => person.name === args.name)) {
        throw new UserInputError(
          'Person already exists',
          {
            invalidArgs: args.name,
          }
        );
      }
      const person = { ...args, id: uuid() }  
      persons.push(person)
      return person;
    }
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
});