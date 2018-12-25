module.exports = `
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    createdAt: String!
    updatedAt: String!
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
`
