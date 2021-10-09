require('dotenv').config()

const { env } = process

const development = {
  username: env.DEV_DB_USERNAME,
  password: env.DEV_DB_PASSWORD,
  database: env.DEV_DB_DATABASE,
  host: env.DEV_DB_HOST,
  dialect: env.DEV_DB_DIALECT,
  port: env.DEV_DB_PORT,
  timezone: env.DB_TIMEZONE,
}

const production = {
  username: env.PROD_DB_USERNAME,
  password: env.PROD_DB_PASSWORD,
  database: env.PROD_DB_DATABASE,
  host: env.PROD_DB_HOST,
  dialect: env.PROD_DB_DIALECT,
  port: env.PROD_DB_PORT,
  timezone: env.DB_TIMEZONE,
}

const test = {
  username: env.TEST_DB_USERNAME,
  password: env.TEST_DB_PASSWORD,
  database: env.TEST_DB_DATABASE,
  host: env.TEST_DB_HOST,
  dialect: env.TEST_DB_DIALECT,
  port: env.TEST_DB_PORT,
  timezone: env.DB_TIMEZONE,
}

module.exports = { development, production, test }
