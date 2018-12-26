const scalars = require('./scalars/index.js')

module.exports = {
  ...scalars,
  UserAction: {
    userUpdate: (parent, args, ctx, info) => {
      return parent.update({
        ...args
      })
    }
  },
  Query: {
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
    },
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
      return ctx.db.User.create({
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email || 'default_email@mock.com'
      })
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
  }
}
