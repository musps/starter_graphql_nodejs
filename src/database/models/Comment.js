module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    user: DataTypes.INTEGER(9),
    content: DataTypes.STRING(200)
  }, {
    // TODO: ?.
  })
  Comment.associate = function(models) {
    // TODO: associations can be defined here.
  }
  return Comment
}
