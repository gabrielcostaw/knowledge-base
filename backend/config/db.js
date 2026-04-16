const config = require('../knexfile.js').development
const knex = require('knex')(config)

knex.migrate.latest()
  .then(() => console.log('Migrations rodaram'))
  .catch(err => console.error(err))

module.exports = knex