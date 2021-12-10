"use strict";

function getDatabaseUrl() {
  return (process.env.NODE_ENV === 'test')
    ? "reptifeed_test"
    : process.env.DATABASE_URL_1 || 'reptifeed';
}

require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY || 'hero-uneven-structure';
const PORT = +process.env.PORT || 3001;
const DATABASE_URL_1 = getDatabaseUrl();
const DATABASE_URL_2 = process.env.DATABASE_URL_2 || 'skink_diet';
const BCRYPT_WORK_FACTOR = process.env.NODE__ENV === 'test' ? 1 : 13;

module.exports = {
  SECRET_KEY,
  PORT,
  getDatabaseUrl,
  DATABASE_URL_1,
  DATABASE_URL_2,
  BCRYPT_WORK_FACTOR
};