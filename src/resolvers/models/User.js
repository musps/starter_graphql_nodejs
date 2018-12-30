const fetchUsers = (parent, args, ctx, info) => {
  return ctx.db.User.findAll()
}

const fetchUserById = (parent, args, ctx, info) => {
  return ctx.db.User.findOne({
    where: {
      id: args.id
    }
  })
}

const createUser = (parent, args, ctx, info) => {
  return ctx.db.User.create({...args})
}

module.exports = {
  fetchUsers,
  fetchUserById,
  createUser
}
