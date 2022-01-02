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
      "name": "arugula",
      "type": "vegetable",
      "frequency": "often",
      "image": "https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2014/12/arugula_small.gif",
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
      "name": "arugula",
      "type": "vegetable",
      "frequency": "often",
      "image": "https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2014/12/arugula_small.gif",
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
        "image": "https://ipcdn.freshop.com/resize?url=https://images.freshop.com/00041130076305/d443cbda6e8e410d15712bd13e544668_large.png&width=256&type=webp&quality=80",
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
        "image": "https://ipcdn.freshop.com/resize?url=https://images.freshop.com/00041130076305/d443cbda6e8e410d15712bd13e544668_large.png&width=256&type=webp&quality=80",
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
        "image": "https://ipcdn.freshop.com/resize?url=https://images.freshop.com/00050000424443/9da038c7d43db93b821df85a8f3ef41a_large.png&width=256&type=webp&quality=80",
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
          "image": "https://s7d2.scene7.com/is/image/PetSmart/5047843?$CLEARjpg$",
          "isTreat": false,
          "tips": ""
        },
        {
          "name": "multivitamin",
          "type": "supplement",
          "frequency": "often",
          "image": "https://m.media-amazon.com/images/I/817pGZlvwML._AC_SX679_.jpg",
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
          "image": "https://s7d2.scene7.com/is/image/PetSmart/5047843?$CLEARjpg$",
          "isTreat": false,
          "tips": ""
        },
        {
          "name": "multivitamin",
          "type": "supplement",
          "frequency": "often",
          "image": "https://m.media-amazon.com/images/I/817pGZlvwML._AC_SX679_.jpg",
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