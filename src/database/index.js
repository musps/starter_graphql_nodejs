const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const logger = require('./logger.js')
const Op = Sequelize.Op;
let config;
let sequelize;

const env = process.env.APP_ENV || ''

// Database object.
const database = {}

try {
  config = require(__dirname + '/config/database.js')[env]
  if (typeof config === 'undefined') {
    throw new Error('Environment not found.')
  }

  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      dialect: config.dialect,
      logging: logger,
      freezeTableName: true,
      operatorsAliases: {
        $and: Op.and,
        $or: Op.or,
        $eq: Op.eq,
        $gt: Op.gt,
        $lt: Op.lt,
        $lte: Op.lte,
        $like: Op.like
      }
    }
  )

} catch (onError) {
  console.log('onError', onError)
  process.exit(1)
}

// Load models.
const modelsPath = __dirname + '/models'
fs.readdirSync(modelsPath)
  .filter((file) => (file.indexOf('.') !== 0) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize['import'](path.join(modelsPath, file))
    database[model.name] = model

    if (database[model.name].associate) {
      database[model.name].associate(database)
    }
  })

// Default exports.
database.sequelize = sequelize;
database.Sequelize = Sequelize;
module.exports = database
