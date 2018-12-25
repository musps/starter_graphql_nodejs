const dotenv = require('dotenv').config()
const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

const database = require('./src/database/index.js')
const resolvers = require('./src/resolvers/index.js')
const typeDefs = require('./src/schemas/index.js')

const server = new ApolloServer({
  typeDefs: gql(typeDefs),
  resolvers,
  context: {
    db: database
  }
})

const port = process.env.APP_PORT || 4000

const app = express()
server.applyMiddleware({
  app
})

app.listen({
  port: port
}, () => {
  console.log('🚀 Server ready at localhost:' + port + server.graphqlPath)
})
