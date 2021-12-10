"use strict";

const request = require('supertest');

const app = require('../app')

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll
} = require('./_testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/** POST /auth/register */
describe('POST /auth/register', () => {
  test('works', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        username: 'sandy-cheeks',
        password: 'texasIzQueen123',
        email: 'sandy@texas.com'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({"token": expect.any(String)});
  });

  test('throw bad request for missing fields', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ username: 'MY-LEG' })
    expect(res.statusCode).toEqual(400);
  })
  
  test('throw bad request for invalid data', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ 
        username: 'sandy-cheeks',
        password: 'texasIzQueen123',
        email: 'hello-i-am-an-email-address'
       })
    expect(res.statusCode).toEqual(400);
  })
});

/** POST /auth/login */
describe('POST /auth/login', () => {
  test('works', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        username: 'spongebob',
        password: 'garyIzQueen123'
      });
    expect(res.body).toEqual({ "token": expect.any(String) });
  });

  test('throws unauth for invalid username', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        username: 'doodle-bob',
        password: 'garyIzQueen123'
      });
    expect(res.statusCode).toEqual(401);
  });
  
  test('throws unauth for invalid password', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        username: 'spongebob',
        password: 'krabbypatties=<3'
      });
      expect(res.statusCode).toEqual(401);
  });
  
  test('throws bad request for missing data', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        username: 'spongebob'
      });
      expect(res.statusCode).toEqual(400);
  });
})