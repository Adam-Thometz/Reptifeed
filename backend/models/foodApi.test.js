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

/** FoodApi.getAllFoods */
describe('get all foods', () => {
  test('success, search result', async () => {
    const food = await foodApi.getAllFoods('blue-tongue-skink', 'dog')
    expect(food).toEqual([
      {
        name: 'dog food',
        type: 'protein',
        frequency: 'often',
        image: 'https://ipcdn.freshop.com/resize?url=https://images.freshop.com/00036800086821/3b0b51456eaf177a3679cee48f7d6314_large.png&width=200&type=webp&quality=80',
        isTreat: false,
        tips: ''
      }
    ]);
  });
})

/** FoodApi.getFood(foodName, species) */
describe('get a single food', () => {
  test('success', async () => {
    const food = await foodApi.getFood('eggs', 'blue-tongue-skink')
    expect(food).toEqual({
      name: 'eggs',
      type: 'protein',
      frequency: 'occasionally',
      image: 'https://ipcdn.freshop.com/resize?url=https://images.freshop.com/00041130076305/d443cbda6e8e410d15712bd13e544668_large.png&width=256&type=webp&quality=80',
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
      image: 'https://ipcdn.freshop.com/resize?url=https://images.freshop.com/00036800086821/3b0b51456eaf177a3679cee48f7d6314_large.png&width=200&type=webp&quality=80',
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

/** FoodApi.getByType(type, species) */
describe('get all foods by food group', () => {
  test('success', async () => {
    const foods = await foodApi.getByType('supplement', 'blue-tongue-skink');
    expect(foods).toEqual([
      {
        name: 'calcium',
        type: 'supplement',
        frequency: 'often',
        image: 'https://s7d2.scene7.com/is/image/PetSmart/5047843?$CLEARjpg$',
        isTreat: false,
        tips: ''
      },
      {
        name: 'multivitamin',
        type: 'supplement',
        frequency: 'often',
        image: 'https://m.media-amazon.com/images/I/817pGZlvwML._AC_SX679_.jpg',
        isTreat: false,
        tips: ''
      }
    ]);
  });
});