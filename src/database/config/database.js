// We need reset the env file while using Sequelize-CLI.
const dotenv = require('dotenv').config()
const dialect = 'mysql'
const migrationStorageTableName = '__sequelize_meta'

module.exports = {
  dev: {
    username: process.env.DB_DEV_USERNAME || '',
    password: process.env.DB_DEV_PASSWORD || '',
    database: process.env.DB_DEV_DATABASE || '',
    host: process.env.DB_DEV_HOST || '',
    dialect: dialect,
    migrationStorageTableName
  },
  preprod: {
    username: process.env.DB_PREPROD_USERNAME || '',
    password: process.env.DB_PREPROD_PASSWORD || '',
    database: process.env.DB_PREPROD_DATABASE || '',
    host: process.env.DB_PREPROD_HOST || '',
    dialect,
    migrationStorageTableName
  },
  prod: {
    username: process.env.DB_PROD_USERNAME || '',
    password: process.env.DB_PROD_PASSWORD || '',
    database: process.env.DB_PROD_DATABASE || '',
    host: process.env.DB_PROD_HOST || '',
    dialect,
    migrationStorageTableName
  },
}
