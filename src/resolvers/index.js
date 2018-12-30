const scalars = require('./scalars/index.js')
const pubsub = require('../pubsub.js')
const UserModel = require('./models/User.js')

module.exports = {
  Query: {
    users: UserModel.fetchUsers,
    user: UserModel.fetchUserById
  },
  Mutation: {
    userCreate: UserModel.createUser
  }
}
