const dotenv = require('dotenv').config()
const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const { PubSub } = require('apollo-server')
const database = require('./src/database/index.js')
const resolvers = require('./src/resolvers/index.js')
const typeDefs = require('./src/schemas/index.js')
const logger = require('./logger.js')
const { createServer } = require('http');

global.pubsub = new PubSub()

const apolloServer = new ApolloServer({
  formatError: logger.formatError,
  formatResponse: logger.formatResponse,
  typeDefs: gql(typeDefs),
  resolvers: resolvers,
  context: {
    db: database
  }
})

const env = process.env.APP_ENV || 'dev'
const port = process.env.APP_PORT || 4000

const app = express()
apolloServer.applyMiddleware({
  app,
  path: '/graphql'
})

const httpServer = createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen({
  port: port
}, () => {
  console.log('🚀 Server ready at localhost:' + port + apolloServer.graphqlPath)
})
