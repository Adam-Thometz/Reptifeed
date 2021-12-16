"use strict";

const request = require('supertest');

const app = require('../app');

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  tokens // use idx 0 for user, idx 1 for admin
} = require('./_testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/** GET api/foods */
describe('get all foods', () => {
  test('works for admin', async () => {
    const token = tokens[1];
    const res = await request(app)
      .get('/api/blue-tongue-skink/foods')
      .set('authorization', `Bearer ${token}`);
    expect(res.body.foods[0]).toEqual({
      "name": "dog food",
      "type": "protein",
      "frequency": "often",
      "image": "",
      "isTreat": false,
      "tips": ""
    });
  });

  test('works for user', async () => {
    const token = tokens[0];
    const res = await request(app)
      .get('/api/blue-tongue-skink/foods')
      .set('authorization', `Bearer ${token}`);
    expect(res.body.foods[0]).toEqual({
      "name": "dog food",
      "type": "protein",
      "frequency": "often",
      "image": "",
      "isTreat": false,
      "tips": ""
    });
  });

  test('throws unauth if not logged in', async () => {
    const res = await request(app)
      .get('/api/blue-tongue-skink/foods')
    expect(res.statusCode).toBe(401);
  });
});

/** GET /api/foods/:food */
describe('get a specific food', () => {
  test('works for user', async () => {
    const token = tokens[0]
    const res = await request(app)
      .get('/api/blue-tongue-skink/foods/eggs')
      .set('authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      food: {
        "name": "eggs",
        "type": "protein",
        "frequency": "occasionally",
        "image": "",
        "isTreat": true,
        "tips": "Can be eaten raw or boiled."
      }
    });
  });

  test('works for admin', async () => {
    const token = tokens[1]
    const res = await request(app)
      .get('/api/blue-tongue-skink/foods/eggs')
      .set('authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      food: {
        "name": "eggs",
        "type": "protein",
        "frequency": "occasionally",
        "image": "",
        "isTreat": true,
        "tips": "Can be eaten raw or boiled."
      }
    });
  });

  test('works, replaces dash in params with space', async () => {
    const token = tokens[0]
    const res = await request(app)
      .get('/api/blue-tongue-skink/foods/cat-food')
      .set('authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      food: {
        "name": "cat food",
        "type": "protein",
        "frequency": "occasionally",
        "image": "",
        "isTreat": false,
        "tips": ""
      }
    });
  });

  test('throws not found if no such food', async () => {
    const token = tokens[0]
    const res = await request(app)
      .get('/api/blue-tongue-skink/foods/braaiinnnzzzzzzz')
      .set('authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
  })

  test('throws unauth if not logged in', async () => {
    const res = await request(app)
      .get('/api/blue-tongue-skink/foods/eggs')
    expect(res.statusCode).toBe(401);
  });
});

/** GET /api/types/:type */
describe('get food by type', () => {
  test('success for user', async () => {
    const token = tokens[0];
    const res = await request(app)
      .get('/api/blue-tongue-skink/types/supplement')
      .set('authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      foods: [
        {
          "name": "calcium",
          "type": "supplement",
          "frequency": "often",
          "image": "",
          "isTreat": false,
          "tips": ""
        },
        {
          "name": "multivitamin",
          "type": "supplement",
          "frequency": "often",
          "image": "",
          "isTreat": false,
          "tips": ""
        },
      ]
    });
  });
  test('success for admin', async () => {
    const token = tokens[1];
    const res = await request(app)
      .get('/api/blue-tongue-skink/types/supplement')
      .set('authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      foods: [
        {
          "name": "calcium",
          "type": "supplement",
          "frequency": "often",
          "image": "",
          "isTreat": false,
          "tips": ""
        },
        {
          "name": "multivitamin",
          "type": "supplement",
          "frequency": "often",
          "image": "",
          "isTreat": false,
          "tips": ""
        },
      ]
    });
  });

  test('throws bad request if invalid food type', async () => {
    const token = tokens[0];
    const res = await request(app)
      .get('/api/blue-tongue-skink/types/fried')
      .set('authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(400);
  });

  test('throws unauth if not logged in', async () => {
    const res = await request(app)
      .get('/api/blue-tongue-skink/types/fruit')
    expect(res.statusCode).toBe(401);
  });
});