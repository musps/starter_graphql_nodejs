const { SchemaDirectiveVisitor } = require('graphql-tools')
const { GraphQLScalarType, GraphQLNonNull } = require('graphql')
const ValidationType = require('./ValidationType.js')

const info = {
  name: 'length',
  description: 'Scalar type wrapper for input validation'
}

class LengthConstraint {
  constructor(props) {
    this.info = props.info
    this.args = props.args
  }

  throwError(min, max) {
    throw new Error(`value must be between ${min} and ${max}`)
  }

  validate(value) {
    const { min, max } = this.args
    if (value.length < min || value.length > max) {
      this.throwError(min, max)
    }
    return value
  }
}

class LengthDirective extends SchemaDirectiveVisitor {
  visitInputFieldDefinition (field, details) {
    field.type = ValidationType.create(field.type, new LengthConstraint({
      info: info,
      args: this.args
    }))
  }
}

module.exports = LengthDirective
