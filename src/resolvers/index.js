const scalars = require('./scalars/index.js')

module.exports = {
  ...scalars,
  Public: {
    users: (parent, args, ctx, info) => {
      return ctx.db.User.findAll({limit: 4})
    }
  },
  UserAction: {
    userUpdate: (parent, args, ctx, info) => {
      return parent.update({
        ...args
      })
    }
  },
  Query: {
    Public: (parent, args, ctx, info) => {
      const userConnector = ctx.req.headers.user_connector || null
      if (userConnector === null || userConnector !== global.userConnector) {
        throw new Error('Access denied !')
      }
      // Return empty array. It keeps sub-requests alive.
      return []
    },
    users: (parent, args, ctx, info) => {
      return ctx.db.User.findAll()
    },
    user: (parent, args, ctx, info) => {
      return ctx.db.User.findOne({
        where: {
          id: args.id
        }
      })
    },
    comments: (parent, args, ctx, info) => {
      return ctx.db.Comment.findAll()
    },
    commentsByUser: (parent, args, ctx, info) => {
      return ctx.db.Comment.findAll({
        where: {
          user: args.id
        }
      })
    }
  },
  Mutation: {
    User: (parent, args, ctx, info) => {
      return ctx.db.User.findOne({
        where: {
          id: args.id
        }
      })
    },
    userCreate: (parent, args, ctx, info) => {
      const user = ctx.db.User.create({
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email || 'default_email@mock.com'
      })
      global.pubsub.publish('USER_CREATED', {
        userCreated: user
      })
      return user
    }
  },
  User: {
    comments: (parent, args, ctx, info) => {
      return ctx.db.Comment.findAll({
        where: {
          user: parent.id
        }
      })
    }
  },
  Subscription: {
    userCreated: {
      subscribe: () => {
        return global.pubsub.asyncIterator('USER_CREATED')
      }
    }
  }
}
