module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    user: DataTypes.INTEGER(9),
    content: DataTypes.STRING(200)
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  })
  Comment.associate = function(models) {
    // TODO: associations can be defined here.
  }
  return Comment
}
