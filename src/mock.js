const database = require('./src/database/index.js')
const dotenv = require('dotenv').config()

const createComment = (userId) => {
  database.Comment.create({
    user: userId,
    content: 'default content'
  })
}

database.User.create({
  firstName: 'default first name',
  lastName: 'default last name',
  email: 'default email'
}).then((user) => {
  const { id } = user
  const nbComment = 2
  for (let i = 0; i < nbComment; i++) {
    createComment(id)
  }
})
