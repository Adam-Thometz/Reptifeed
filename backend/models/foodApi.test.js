"use strict";

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll
} = require('./_testCommon');
const db = require('../db');
const foodApi = require('./foodApi');
const { NotFoundError } = require('../expressError');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/** FoodApi.getFood(foodName) */
describe('get a single food', () => {
  test('success', async () => {
    const food = await foodApi.getFood('eggs', 'blue-tongue-skink')
    expect(food).toEqual({
      name: 'eggs',
      type: 'protein',
      frequency: 'occasionally',
      image: '',
      isTreat: true,
      tips: 'Can be eaten raw or boiled.'
    });
  });

  test('success, eliminates dashes', async () => {
    const food = await foodApi.getFood('dog-food', 'blue-tongue-skink')
    expect(food).toEqual({
      name: 'dog food',
      type: 'protein',
      frequency: 'often',
      image: '',
      isTreat: false,
      tips: ''
    });
  });

  test('throws not found if food does not exist', async () => {
    try {
      await foodApi.getFood('my-pride', 'blue-tongue-skink');
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    };
  });
});

/** FoodApi.getByType(type) */
describe('get all foods by food group', () => {
  test('success', async () => {
    const foods = await foodApi.getByType('supplement', 'blue-tongue-skink');
    expect(foods).toEqual([
      {
        name: 'calcium',
        type: 'supplement',
        frequency: 'often',
        image: '',
        isTreat: false,
        tips: ''
      },
      {
        name: 'multivitamin',
        type: 'supplement',
        frequency: 'often',
        image: '',
        isTreat: false,
        tips: ''
      }
    ]);
  });
});

/** FoodApi.getTreatsByType(type) */
describe('get treats by food type', () => {
  test('success', async () => {
    const treats = await foodApi.getTreatsByType('vegetable', 'blue-tongue-skink');
    expect(treats).toEqual([
      {
        name: 'basil',
        type: 'vegetable',
        frequency: 'occasionally',
        image: '',
        isTreat: true,
        tips: ''
      }
    ]);
  });
});