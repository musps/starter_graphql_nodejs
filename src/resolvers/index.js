module.exports = {
  Query: {
    users: (parent, args, { db }, info) => {
      return db.User.findAll()
    },
    user: (parent, { id }, { db }, info) => {
      return db.User.findOne({
        where: {
          id: id
        }
      })
    },
    comments: (parent, args, { db }, info) => {
      return db.Comment.findAll()
    },
    commentsByUser: (parent, { id }, { db }, info) => {
      return db.Comment.findAll({
        where: {
          user: id
        }
      })
    },
  },
  User: {
    comments: (parent, args, { db }, info) => {
      const { id } = parent
      return db.Comment.findAll({
        where: {
          user: id
        }
      })
    }
  }
}
