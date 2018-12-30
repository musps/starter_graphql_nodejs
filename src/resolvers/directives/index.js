const isAuthenticated = require('./isAuthenticated.js')
const LengthDirective = require('./length.js')

module.exports = {
  schemaDirectives: {
    length: LengthDirective
  },
  directiveResolvers: {
    isAuthenticated: isAuthenticated
  }
}
