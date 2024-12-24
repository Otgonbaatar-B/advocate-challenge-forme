import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    description: String!
    isDeleted: Boolean!
    isFinished: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    helloQuery: String
    getAllTasks: [Task!]!
    getFinishedTasksLists: [Task!]!
  }

  input CreateTaskInput {
    title: String!
    description: String!
  }

  input UpdateTaskInput {
    title: String
    description: String
    isFinished: Boolean
    isDeleted: Boolean
  }

  type Mutation {
    sayHello(name: String!): String
    addTask(input: CreateTaskInput!): Task!
    updateTask(id: ID!, input: UpdateTaskInput!): Task!
  }
`;
