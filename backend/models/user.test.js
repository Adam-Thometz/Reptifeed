"use strict";

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testUserIds
} = require('./_testCommon');
const db = require('../db');
const User = require('./user');
const { BadRequestError, UnauthorizedError, NotFoundError } = require('../expressError')

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/** User.register(data) */
describe('register', () => {
  const newUser = {
    username: 'patrick-star',
    email: 'patrick@bikinibottom.net',
    isAdmin: false
  };

  test('success', async () => {
    const user = await User.register({...newUser, password: 'rocklife123'});
    expect(user).toEqual({ ...newUser, id: expect.any(Number) });
    const found = await db.query(`SELECT * FROM users WHERE username = 'patrick-star'`);
    expect(found.rows.length).toEqual(1);
  });

  test('throws bad request if duplicate username', async () => {
    try {
      await User.register({...newUser, password: 'rocklife123'});
      await User.register({...newUser, password: 'rocklife123'});
    } catch(err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    };
  });
});

/** User.login(data) */
describe('login', () => {
  test('success', async () => {
    const user = await User.login({username: 'spongebob', password: 'garyIzQueen123'});
    expect(user).toEqual({
      id: expect.any(Number),
      username: 'spongebob',
      email: 'spongebob@krustykrab.com',
      isAdmin: false
    });
  });

  test('throws unauth for invalid username', async () => {
    try {
      await User.login('plankton', 'wrthw6454gg');
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
  });
  
  test('throws unauth for invalid password', async () => {
    try {
      await User.login('spongebob', 'ilikepatrick');
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
  });
});

/** User.getAll() */
describe('get all users', () => {
  test('success', async () => {
    const users = await User.getAll();
    expect(users).toEqual([
      {
        id: expect.any(Number),
        username: 'spongebob',
        email: 'spongebob@krustykrab.com',
        isAdmin: false
      },
      {
        id: expect.any(Number),
        username: 'mr-krabs',
        email: 'eugene@krustykrab.com',
        isAdmin: true
      }
    ]);
  });
});

/** User.get(id) */
describe('get user by id', () => {
  test('success', async () => {
    const id = testUserIds[0]
    const user = await User.get(id);
    expect(user).toEqual({
      id,
      username: 'spongebob',
      email: 'spongebob@krustykrab.com',
      isAdmin: false
    });
  });

  test('throws not found if no such user', async () => {
    try {
      await User.get(-5);
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  })
});

/** User.update(id, data) */
describe('update a user by id', () => {
  const updateData = {
    username: "spongebobSquarepants",
    email: "square@krustykrab.com",
    isAdmin: true
  }

  test('works', async () => {
    const id = testUserIds[0]
    const user = await User.update(id, updateData);
    expect(user).toEqual({
      id,
      ...updateData
    });
  });

  test('throws not found if no such user', async () => {
    try {
      await User.update(-1, {username: 'MY-LEG'});
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    };
  });

  test('throws bad request if no data', async () => {
    try {
      await User.update(testUserIds[0], {})
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    };
  });
});

/** User.delete(id) */
describe('delete a user by id', () => {
  test('works', async () => {
    const id = testUserIds[0];
    const username = await User.delete(id);
    expect(username).toEqual('spongebob');
    const res = await db.query(`
      SELECT * FROM users
      WHERE id = $1
    `, [id]);
    expect(res.rows.length).toEqual(0)
  });

  test('throws not found if no such user', async () => {
    try {
      await User.delete(-1);
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});