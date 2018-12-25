const { GraphQLScalarType } = require('graphql')

const isEmail = (str) => {
  const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
  return pattern.test(str)
}

const scalar = new GraphQLScalarType({
  name: 'Email',
  description: 'Default scalar Email description',
  parseValue: (value) => {
    console.log('Email parseValue', value)
    return value
  },
  serialize: (value) => {
    return value
  },
  parseLiteral: (ast) => {
    if (isEmail(ast.value)) {
      return ast.value
    }
    throw new Error('Field email is not a valid email !')
  }
})

module.exports = scalar
