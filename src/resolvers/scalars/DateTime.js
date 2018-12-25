const { GraphQLScalarType } = require('graphql')

const resolveDataTime = new  GraphQLScalarType({
  name: 'DateTime',
  description: 'Default scalar DateTime description',
  parseValue: (value) => {
    console.log('parseValue', value)
    return value
  },
  serialize: (value) => {
    const time = new Date(value)
    return time.toUTCString()
  },
  parseLiteral: (ast) => {
    console.log('parseLiteral', ast)
    return ast.value
  }
})

module.exports = resolveDataTime
