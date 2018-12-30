module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING(50),
    password: DataTypes.STRING(200),
    email: DataTypes.STRING(50),
    firstName: DataTypes.STRING(50),
    lastName: DataTypes.STRING(50),
    rank: DataTypes.STRING(50),
    isActive: DataTypes.BOOLEAN
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  })
  User.associate = function(models) {
    // TODO: associations can be defined here.
  }
  return User
}
