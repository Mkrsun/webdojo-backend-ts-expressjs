/* eslint-disable @typescript-eslint/no-var-requires */
const Knex = require('knex');

const config = require('../../knexfile.js');
const environment = process.env.NODE_ENV || 'development';
const connectionConfig = config[environment];

const knex = Knex(connectionConfig);
knex.migrate.latest();
