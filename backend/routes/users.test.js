"use strict";

const request = require('supertest');

const app = require('../app');

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testUserIds, // use idx 0 for user, idx 1 for admin
  tokens // use idx 0 for user, idx 1 for admin
} = require('./_testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/** GET /users */
describe('get all users', () => {
  test('works for admin', async () => {
    const token = tokens[1]
    const res = await request(app)
      .get('/users')
      .set('authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      users: [
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
      ]
    });
  });

  // test('throws unauth for non-admin', async () => {

  // })
});

/** GET /users/:id */
describe('get user by id', () => {
  test('success for user', async () => {
    const id = testUserIds[0]
    const token = tokens[0]
    const res = await request(app)
      .get(`/users/${id}`)
      .set("authorization", `Bearer ${token}`);
    expect(res.body).toEqual({
      user: {
        id,
        username: 'spongebob',
        email: 'spongebob@krustykrab.com',
        isAdmin: false
      }
    });
  });
  
  test('success for admin', async () => {
    const id = testUserIds[0]
    const token = tokens[1]
    const res = await request(app)
      .get(`/users/${id}`)
      .set("authorization", `Bearer ${token}`);
    expect(res.body).toEqual({
      user: {
        id,
        username: 'spongebob',
        email: 'spongebob@krustykrab.com',
        isAdmin: false
      }
    });
  });
  
  test('throw unauth for other users', async () => {
    const id = testUserIds[0]
    const token = tokens[0]
    const res = await request(app)
      .get(`/users/${id+1}`)
      .set("authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(401);
  });
  
  test('throw unauth for anon', async () => {
    const res = await request(app)
      .get(`/users/1`)
    expect(res.statusCode).toEqual(401);
  });

  test('throw not found if no such user', async () => {
    const token = tokens[1]
    const res = await request(app)
      .get(`/users/-1`)
      .set("authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(404);
  });
});

/** PATCH /users/:id */
describe('update user by id', () => {
  test('works for admin', async () => {
    const id = testUserIds[0];
    const token = tokens[1];
    const res = await request(app)
      .patch(`/users/${id}`)
      .send({ username: 'squarepants' })
      .set('authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      updatedUser: {
        id,
        username: 'squarepants',
        email: 'spongebob@krustykrab.com',
        isAdmin: false  
      }
    });
  });
  
  test('works for same user', async () => {
    const id = testUserIds[0];
    const token = tokens[0];
    const res = await request(app)
      .patch(`/users/${id}`)
      .send({ username: 'squarepants' })
      .set('authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      updatedUser: {
        id,
        username: 'squarepants',
        email: 'spongebob@krustykrab.com',
        isAdmin: false  
      }
    });
  });
  
  test('throws unauth if not same user', async () => {
    const id = testUserIds[0];
    const token = tokens[0];
    const res = await request(app)
      .patch(`/users/${id+1}`)
      .send({
        username: 'squarepants'
      })
      .set('authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(401);
  });
  
  test('throws unauth if anon', async () => {
    const res = await request(app)
    .patch('/users/1')
    .send({ username: 'squarepants' });
    expect(res.statusCode).toEqual(401);
  });
  
  test('throws bad request if invalid data', async () => {
    const id = testUserIds[0];
    const token = tokens[0];
    const res = await request(app)
      .patch(`/users/${id}`)
      .send({ email: 'hello-i-am-email' })
      .set('authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(400);
  });
  
  test('throws bad request if invalid fields', async () => {
    const id = testUserIds[0];
    const token = tokens[0];
    const res = await request(app)
      .patch(`/users/${id}`)
      .send({ never: 'gonna-give-you-up' })
      .set('authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(400);
  });
});

/** DELETE /users/:id */
describe('delete a user by id', () => {
  test('works for same user', async () => {
    const id = testUserIds[0];
    const token = tokens[0];
    const res = await request(app)
      .delete(`/users/${id}`)
      .set('authorization', `Bearer ${token}`);
    expect(res.body).toEqual({ deleted: 'spongebob' });
  });

  test('works for admin', async () => {
    const id = testUserIds[0];
    const token = tokens[1];
    const res = await request(app)
      .delete(`/users/${id}`)
      .set('authorization', `Bearer ${token}`);
    expect(res.body).toEqual({ deleted: 'spongebob' });
  });
  
  test('throws unauth if not same user', async () => {
    const id = testUserIds[1];
    const token = tokens[0];
    const res = await request(app)
      .delete(`/users/${id}`)
      .set('authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(401);
  });
  
  test('throws unauth if anon', async () => {
    const id = testUserIds[1];
    const res = await request(app)
      .delete(`/users/${id}`)
    expect(res.statusCode).toEqual(401);
  });
  
  test('throws not found if no such user', async () => {
    const token = tokens[1]
    const res = await request(app)
      .delete(`/users/-1`)
      .set('authorization', `Bearer ${token}`)
    expect(res.statusCode).toEqual(404);
  });
});