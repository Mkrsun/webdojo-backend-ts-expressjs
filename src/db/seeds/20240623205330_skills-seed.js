/* eslint-disable @typescript-eslint/no-var-requires */
const knex = require('knex')(require('../../../knexfile.js'));
const path = require('path');
const fs = require('fs');

const sqlPathUp = './sql/20240623205330_skills-seed-up.sql';

// New change
exports.seed = async function () {
  const sql = fs.readFileSync(path.resolve(__dirname, sqlPathUp), 'utf-8');
  await knex.raw(sql);
};
