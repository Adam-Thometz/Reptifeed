const db = require('../db');
const { createToken } = require('../helpers/createToken');
const User = require('../models/user');

const testUserIds = [];
const tokens = []

async function commonBeforeAll() {
  await db.query(`DELETE FROM users`);
  await db.query(`DELETE FROM reptiles`);
  
  const user1 = await User.register({
    username: 'spongebob',
    password: 'garyIzQueen123',
    email: 'spongebob@krustykrab.com'
  });
  const user2 = await User.register({
    username: 'mr-krabs',
    password: 'moneyIzQueen123',
    email: 'eugene@krustykrab.com',
    isAdmin: true
  });

  testUserIds[0] = user1.id;
  testUserIds[1] = user2.id;
  tokens[0] = createToken({ id: testUserIds[0], username: 'spongebob', isAdmin: false });
  tokens[1] = createToken({ id: testUserIds[1], username: 'mr-krabs', isAdmin: true });
  
  //   await db.query(`
  //     INSERT INTO reptiles (name, species, subspecies, birthday, owner)
  //     VALUES ('gary', 'snail', 'sea snail', '2010-01-01', $1),
  //            ('larry', 'snail', 'sea snail', '2021-01-01', $2)
  //   `, [userIds[0], userIds[1]]);
};

async function commonBeforeEach() {
  await db.query('BEGIN');
};

async function commonAfterEach() {
  await db.query('ROLLBACK');
};

async function commonAfterAll() {
  await db.end();
};


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testUserIds,
  tokens
};