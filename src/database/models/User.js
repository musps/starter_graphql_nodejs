module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING(50),
    lastName: DataTypes.STRING(50),
    email: DataTypes.STRING(50)
  }, {
    // TODO: ?.
  })
  User.associate = function(models) {
    // TODO: associations can be defined here.
  }
  return User
}
