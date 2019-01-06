class Error {
  constructor(field, message) {
    this.field = field
    this.message = message
  }

  toObject() {
    return {
      field,
      message
    }
  }
}

class Errors {
  constructor() {
    this.errors = []
  }

  add(field, message) {
    this.errors.push(new Error(field, message))
  }

  toArray() {
    return this.errors
  }
}

// ======================================================

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

const createUser = async (parent, args, ctx, info) => {
  args.input.rank = 0
  args.input.isActive = 1
  let user = await ctx.db.User.create({...args.input})
  user = user.dataValues
  console.log(user)
  return {
    ...user,
    errors: [
    {
      field: 'username',
      message: 'nop'
    }
    ]
  }
}

module.exports = {
  Query: {
    users: fetchUsers,
    user: fetchUserById,
  },
  Mutation: {
    userCreate: createUser
  }
}
