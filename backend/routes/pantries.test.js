"use strict";

const request = require('supertest');

const app = require('../app');
const db = require('../db');

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

/** GET /pantries/:id */
describe('get pantry of a user', () => {
  test('works for correct user', async () => {
    const id = testUserIds[0];
    const token = tokens[0];
    const res = await request(app)
      .get(`/pantries/${id}`)
      .set('authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      pantry: [{
        name: 'krabby patties',
        type: 'protein',
        frequency: 'moderately',
        image: 'image',
        isTreat: true,
        tips: 'serve with lettuce, tomatoes, pickles, ketchup, cheese, and bun',
        ownerId: id
      }]
    });
  });

  test('works for admin', async () => {
    const id = testUserIds[0]
    const token = tokens[1];
    const res = await request(app)
      .get(`/pantries/${id}`)
      .set('authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      pantry: [{
        name: 'krabby patties',
        type: 'protein',
        frequency: 'moderately',
        image: 'image',
        isTreat: true,
        tips: 'serve with lettuce, tomatoes, pickles, ketchup, cheese, and bun',
        ownerId: id
      }]
    });
  });

  test('throws unauth for incorrect user', async () => {
    const id = testUserIds[1];
    const token = tokens[0];
    const res = await request(app)
      .get(`/pantries/${id}`)
      .set('authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(401)
  });

  test('throws not found for unknown user', async () => {
    const token = tokens[0];
    const res = await request(app)
      .get(`/pantries/-1`)
      .set('authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(401)
  });
});

/** POST /pantries/:id */
describe('add food to pantry', () => {
  test('works for correct user', async () => {
    const food = {
      name: 'eggs',
      type: 'protein',
      frequency: 'occasionally',
      image: '',
      isTreat: true,
      tips: 'Can be eaten raw or boiled.'
    }
    const id = testUserIds[0];
    const token = tokens[0];
    const res = await request(app)
      .post(`/pantries/${id}`)
      .send(food)
      .set('authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      newFood: {
        ...food,
        ownerId: id
      }
    });
  });

  test('works for admin', async () => {
    const food = {
      name: 'eggs',
      type: 'protein',
      frequency: 'occasionally',
      image: '',
      isTreat: true,
      tips: 'Can be eaten raw or boiled.'
    }
    const id = testUserIds[0];
    const token = tokens[1];
    const res = await request(app)
      .post(`/pantries/${id}`)
      .send(food)
      .set('authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      newFood: {
        ...food,
        ownerId: id
      }
    });
  });

  test('throws unauth for incorrect user', async () => {
    const food = {
      name: 'eggs',
      type: 'protein',
      frequency: 'occasionally',
      image: '',
      isTreat: true,
      tips: 'Can be eaten raw or boiled.'
    }
    const id = testUserIds[1];
    const token = tokens[0];
    const res = await request(app)
      .post(`/pantries/${id}`)
      .send(food)
      .set('authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(401);
  });

  test('throws bad request for invalid data', async () => {
    const food = {
      name: 'eggs',
      type: true,
      frequency: 3,
      isTreat: 'i am a treat!',
      tips: false
    }
    const id = testUserIds[0];
    const token = tokens[0];
    const res = await request(app)
      .post(`/pantries/${id}`)
      .send(food)
      .set('authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(400);
  });

  test('throws not found for unknown user', async () => {
    const token = tokens[0];
    const res = await request(app)
      .get(`/pantries/-1`)
      .set('authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(401)
  });
});

describe('remove food from pantry', () => {
  test('works for correct user', async () => {
    const id = testUserIds[0];
    const token = tokens[0];
    const res = await request(app)
      .delete(`/pantries/${id}/krabby-patties`)
      .set('authorization', `Bearer ${token}`);
    
    expect(res.body).toEqual({ deleted: `krabby patties from pantry of user #${id}` })
    const check = await db.query(`
      SELECT name
      FROM pantries
      WHERE owner_id = $1 AND name = 'krabby patties'
    `, [id]);

    expect(check.rows.length).toBe(0);
  });

  test('works for admin', async () => {
    const id = testUserIds[0];
    const token = tokens[1];
    const res = await request(app)
      .delete(`/pantries/${id}/krabby-patties`)
      .set('authorization', `Bearer ${token}`);
    
    expect(res.body).toEqual({ deleted: `krabby patties from pantry of user #${id}` })
    const check = await db.query(`
      SELECT name
      FROM pantries
      WHERE owner_id = $1 AND name = 'krabby patties'
    `, [id]);

    expect(check.rows.length).toBe(0);
  });
  
  test('throws unauth for incorrect user', async () => {
    const id = testUserIds[1];
    const token = tokens[0];
    const res = await request(app)
      .delete(`/pantries/${id}/krabby-patties`)
      .set('authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toBe(401)
  });
});