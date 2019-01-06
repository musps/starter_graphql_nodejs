const { GraphQLScalarType } = require('graphql')

const scalar = new GraphQLScalarType({
  name: 'DateTime',
  description: 'Default scalar DateTime description',
  parseValue: (value) => {
    console.log('parseValue', value)
    return value
  },
  serialize: (value) => {
    console.log('serialize', value)
    return value
  },
  parseLiteral: (ast) => {
    console.log('parseLiteral', ast)
    return ast.value
  }
})

module.exports = scalar
