const { GraphQLScalarType, GraphQLNonNull } = require('graphql')
const { SchemaDirectiveVisitor } = require('graphql-tools')

const defaultName = 'name'
const defaultDescription = 'Scalar type wrapper for input validatio'

// @source https://github.com/apollographql/graphql-tools/issues/858
class ValidationType extends GraphQLScalarType {
  static create(fieldType, fieldContrainst) {
    if (fieldType instanceof GraphQLScalarType) {
      return new this(fieldType, fieldContrainst)
    }

    // If the root is a non-null type, we should wrap the inner type instead
    if (fieldType instanceof GraphQLNonNull && fieldType.ofType instanceof GraphQLScalarType) {
      return new GraphQLNonNull(new this(fieldType.ofType, fieldContrainst))
    }

    throw new Error(`Type ${fieldType} cannot be validated. Only scalars are accepted`)
  }

  constructor(type, constraint) {
    super({
      // Params
      name: constraint.info.name || defaultName,
      description: constraint.info.description || defaultDescription,

       // Server > Client
      serialize(value) {
        return type.serialize(value)
      },

       // Client (variables) > Server
      parseValue(value) {
        const parsedValue = type.parseValue(value)
        return constraint.validate(parsedValue)
      },

       // Client (params) > Server
      parseLiteral(valueNode, variables) {
        const parsedValue = type.parseLiteral(valueNode, variables)
        return constraint.validate(parsedValue)
      },
    })
  }
}

module.exports = ValidationType
