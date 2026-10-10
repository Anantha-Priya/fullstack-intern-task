const knex = require('knex');
const config = require('../knexfile');

// Pick the config that matches NODE_ENV (falls back to development)
const db = knex(config[process.env.NODE_ENV] || config.development);

module.exports = db;
