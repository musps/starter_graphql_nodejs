const scalars = require('./scalars/index.js')
const pubsub = require('../pubsub.js')
const UserModel = require('./models/User.js')

module.exports = {
  Query: {
    ...UserModel.Query
  },
  Mutation: {
    ...UserModel.Mutation
  }
}
