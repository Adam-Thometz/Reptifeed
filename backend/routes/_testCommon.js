const db = require('../db');
const { createToken } = require('../helpers/createToken');
const Pantry = require('../models/pantry');
const Reptile = require('../models/reptile');
const User = require('../models/user');

const testUserIds = [];
const testReptileIds = [];
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
  
  const reptile1 = await Reptile.create({
    name: 'gary',
    species: 'snail',
    subspecies: 'sea snail',
    birthday: '2010-01-01',
    imgUrl: 'picture of gary',
    ownerId: user1.id
  });

  const reptile2 = await Reptile.create({
    name: 'larry',
    species: 'snail',
    subspecies: 'mean sea snail',
    birthday: '2015-01-01',
    imgUrl: 'picture of larry',
    ownerId: user2.id
  });

  testReptileIds[0] = reptile1.id;
  testReptileIds[1] = reptile2.id;

  const food = {
    name: 'krabby patties',
    type: 'protein',
    frequency: 'moderately',
    image: 'image',
    isTreat: true,
    tips: 'serve with lettuce, tomatoes, pickles, ketchup, cheese, and bun',
  }

  await Pantry.addFood(food, testUserIds[0])
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
  testReptileIds,
  tokens
};