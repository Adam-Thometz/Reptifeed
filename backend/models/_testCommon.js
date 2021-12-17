const bcrypt = require('bcrypt');

const db = require('../db');
const { BCRYPT_WORK_FACTOR } = require('../config');

const testUserIds = [];
const testReptileIds = [];

async function commonBeforeAll() {
  await db.query(`DELETE FROM users`);
  await db.query(`DELETE FROM reptiles`);

  const users = await db.query(`
    INSERT INTO users (username, password, email, is_admin)
    VALUES ('spongebob', $1, 'spongebob@krustykrab.com', false),
           ('mr-krabs', $2, 'eugene@krustykrab.com', true)
    RETURNING id
  `, [
    await bcrypt.hash('garyIzQueen123', BCRYPT_WORK_FACTOR),
    await bcrypt.hash('moneyIzQueen123', BCRYPT_WORK_FACTOR)
  ]);
  testUserIds.splice(0, 0, ...users.rows.map(r => r.id));

  const reptile = await db.query(`
    INSERT INTO reptiles (name, species, subspecies, birthday, img_url, owner_id)
    VALUES ('gary', 'snail', 'sea snail', '2010-01-01', 'picture of gary', $1)
    RETURNING id
  `, [testUserIds[0]]);
  testReptileIds.splice(0, 0, ...reptile.rows.map(r => r.id));

  await db.query(`
    INSERT INTO pantries (owner_id, name, type, frequency, image, is_treat, tips)
    VALUES ($1, 'krabby patties', 'protein', 'moderately', 'image', true, 'serve with lettuce, tomatoes, pickles, ketchup, cheese, and bun')
  `, [testUserIds[0]]);
}

async function commonBeforeEach() {
  await db.query('BEGIN');
}

async function commonAfterEach() {
  await db.query('ROLLBACK');
}

async function commonAfterAll() {
  await db.end();
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testUserIds,
  testReptileIds
};