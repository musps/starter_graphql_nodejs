const dotenv = require('dotenv').config()
const express = require('express')
const { ApolloServer, makeExecutableSchema } = require('apollo-server-express')

const createServer = require('./createServer.js')

const database = require('./src/database/index.js')

const resolvers = require('./src/resolvers/index.js')
const typeDefs = require('./src/schemas/index.js')
const logger = require('./src/logger.js')
const directives = require('./src/resolvers/directives/index.js')

global.userConnector = process.env.USER_CONNECTOR || ''

const parseBool = str => (str === 'true')
const isHttps = parseBool(process.env.APP_HTTPS || 'false')
const env = process.env.APP_ENV || 'dev'
const port = process.env.APP_PORT || 4000
const hostname = process.env.APP_HOSTNAME || 'localhost'
let server = null

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: directives.schemaDirectives,
  directiveResolvers: directives.directiveResolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  }
})

const apolloServerConfig = {
  formatError: logger.formatError,
  formatResponse: logger.formatResponse,
  schema,
  context: ({ req }) => ({
    req,
    db: database
  }),
  playground: (process.env.APP_ENV !== 'prod'),
  debug: false,
}

const apolloServer = new ApolloServer(apolloServerConfig)
const app = express()

apolloServer.applyMiddleware({
  app,
  path: '/api/v0'
})

if (!isHttps) {
  server = createServer.http({ app })
} else {
  const httpsKey = process.env.APP_HTTPS_KEY || ''
  const httpsCert = process.env.APP_HTTPS_CERT || ''
  server = createServer.https({
    port: port,
    hostname,
    key: httpsKey,
    cert: httpsCert,
    app
  })
}

apolloServer.installSubscriptionHandlers(server);
server.listen({ port }, () => {
  const uriSchema = isHttps ? 'https' : 'http'
  const uri = `${uriSchema}://${hostname}:${port}${apolloServer.graphqlPath}`
  console.log('🚀 Server ready at ' + uri)
  console.log('🚀 ENV : ' + env)
})
