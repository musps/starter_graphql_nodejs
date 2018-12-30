const dotenv = require('dotenv').config()
const express = require('express')
const { ApolloServer, makeExecutableSchema } = require('apollo-server-express')
const database = require('./src/database/index.js')
const resolvers = require('./src/resolvers/index.js')
const typeDefs = require('./src/schemas/index.js')
const logger = require('./src/logger.js')
const createServer = require('./createServer.js')

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
  directiveResolvers: {
    isAuthenticated: async (next, source, args, ctx) => {
      const userConnector = ctx.req.headers.user_connector || null

      if (userConnector === null || userConnector !== global.userConnector) {
        throw new Error('Access denied !')
      } else {
        return next()
      }
    },
    datetime: async (next, source, args, ctx) => {
      const value = await next()
      const { format } = args
      return format
    }
  },
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
  console.log('🚀 Server ready at localhost:' + port + apolloServer.graphqlPath)
  console.log('🚀 ENV : ' + env)
})
