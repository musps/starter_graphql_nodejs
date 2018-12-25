const DateTime = require('./scalars/DateTime.js')

module.exports = {
  DateTime,
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
