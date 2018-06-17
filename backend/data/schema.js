import { makeExecutableSchema } from 'graphql-tools';
// import mocks from './mocks';
import resolvers from './resolvers';

const typeDefs = `
scalar DateTime

type Query {
  games: [Game]
  getGame (id: Int!): Game
  users: [User]
  getUser (id: Int!): User
  steps: [Step]
}
type User {
  id: Int
  email: String
  firstName: String
  lastName: String
  role: String
}

type Step {
  id: Int
  name: String
  description: String
  gameId: Int
  game: Game!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Game {
  id: Int
  name: String
  description: String
  published: Boolean
  createdAt: DateTime!
  updatedAt: DateTime!
  steps: [Step]
}

type Mutation {
        login (
            email: String!,
            password: String!
        ): String
        createUser (
            firstName: String!,
            lastName: String,
            email: String!,
            password: String!
            role: String!
        ): User
        updateUser (
            id: Int!,
            firstName: String!,
            lastName: String,
            email: String!,
            password: String!,
            role: String!
        ): User
        addGame (
            name: String!,
            description: String!
        ): Game
        updateGame (
            id: Int!,
            name: String!,
            description: String!
        ): Game
        deleteGame (id: Int!): Boolean
    }
`;

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

// addMockFunctionsToSchema({ schema, mocks });

export default schema;
