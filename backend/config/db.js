const env = process.env.NODE_ENV || 'development'
const config = require('../knexfile.js')[env]
const knex = require('knex')(config)

knex.migrate.latest()
  .then(() => console.log('Migrations rodaram'))
  .catch(err => console.error(err))

module.exports = knex