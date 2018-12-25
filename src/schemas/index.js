module.exports = `
  scalar DateTime

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    createdAt: String!
    updatedAt: DateTime!
    comments: [Comment]
  }
  type Comment {
    id: ID!
    user: Int!
    content: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    users: [User]
    user(id: Int!): User
    comments: [Comment]
    commentsByUser(id: Int!): [Comment]
  }

  type Mutation {
    userCreate(
      firstName: String!
      lastName: String!
      email: String
    ): User
  }
`
