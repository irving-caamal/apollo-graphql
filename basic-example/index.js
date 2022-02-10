import { gql, ApolloServer, UserInputError } from 'apollo-server';
import {v4 as uuid } from 'uuid';
import fetch from 'isomorphic-unfetch';

const typeDefs = gql`
    enum YesNo{
      YES
      NO
    }
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
        allPersons(phone: YesNo): [Person]!
        findPerson(name: String!): Person
    }
    type Mutation {
      addPerson(
        name: String!
        phone: String
        street: String!
        city: String!
      ): Person
      editNumber(
        name: String!
        phone: String!
      ): Person
    }
`
const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: async (root, args) => {
      const persons = await fetch('http://localhost:3000/persons')
      .then( r => r.json() )
      .then( data => data );
      
      if (!args.phone) return persons
      const byPhone = person => args.phone === 'YES' ?
      person.phone : !person.phone

      return persons.filter(byPhone)
    },
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
    },
    editNumber(root, args) {
      const person = persons.find(person => person.name === args.name)
      if (!person) {
        throw new UserInputError(
          'Person does not exist',
          {
            invalidArgs: args.name,
          }
        );
      }
      person.phone = args.phone
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