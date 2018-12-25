module.exports = `
  scalar DateTime
  scalar Email

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

  type UserAction {
    userUpdate(
      firstName: String!
      lastName: String!
      email: Email!
    ): User
  }

  type Mutation {
    User(id: Int!): UserAction
    userCreate(
      firstName: String!
      lastName: String!
      email: Email
    ): User
  }
`
