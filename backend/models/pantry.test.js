"use strict";

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testUserIds
} = require('./_testCommon');
const db = require('../db');
const Pantry = require('./pantry');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/** Pantry.getPantry(userId) */
describe("get a user's pantry", () => {
  test('success', async () => {
    const id = testUserIds[0];
    const pantry = await Pantry.getPantry(id);
    expect(pantry).toEqual([
      {
        name: 'krabby patties',
        type: 'protein',
        frequency: 'moderately',
        image: 'image',
        isTreat: true,
        tips: 'serve with lettuce, tomatoes, pickles, ketchup, cheese, and bun',
        ownerId: id
      }
    ]);
  });
});

/** Pantry.addFood(food, userId) */
describe('add food to pantry', () => {
  test('success', async () => {
    const id = testUserIds[0]
    const food = {
      name: 'eggs',
      type: 'protein',
      frequency: 'occasionally',
      image: '',
      isTreat: true,
      tips: 'Can be eaten raw or boiled.'
    }
    const foodRes = await Pantry.addFood(food, id);
    expect(foodRes).toEqual({
      ...food,
      ownerId: id
    });
  });
});

/** Pantry.removeFood(foodName, userId) */
describe('remove food from pantry', () => {
  test('success', async () => {
    const id = testUserIds[0]
    const foodName = 'krabby patties'
    await Pantry.removeFood(foodName, id);

    const food = await db.query(`
      SELECT name FROM pantries WHERE owner_id = $1 AND name = $2
    `, [id, foodName]);
    expect(food.rows.length).toEqual(0);
  });
});