"use strict";

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testUserIds,
  testReptileIds
} = require('./_testCommon');
const db = require('../db');
const Reptile = require('./reptile');
const { NotFoundError, BadRequestError } = require('../expressError');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/** Reptile.create(data) */
describe('create new reptile', () => {
  test('success', async () => {
    const reptile = {
      name: 'Unity',
      species: 'blue tongue skink',
      subspecies: 'Halmahera',
      birthday: '2021-05-01',
      imgUrl: '',
      ownerId: testUserIds[0]
    };
    const newReptile = await Reptile.create(reptile);
    expect(newReptile).toEqual({ ...reptile, id: expect.any(Number) });
  });
});

/** Reptile.getAll() */
describe('get all reptiles', () => {
  test('success', async () => {
    const reptiles = await Reptile.getAll();
    expect(reptiles).toEqual([
      {
        id: expect.any(Number),
        name: 'gary',
        species: 'snail',
        subspecies: 'sea snail',
        birthday: '2010-01-01',
        imgUrl: 'picture of gary',
        ownerId: testUserIds[0]
      }
    ]);
  });
});

/** Reptile.get(id) */
describe('get reptile by id', () => {
  test('success', async () => {
    const id = testReptileIds[0];
    const reptile = await Reptile.get(id);
    expect(reptile).toEqual({
      id: expect.any(Number),
      name: 'gary',
      species: 'snail',
      subspecies: 'sea snail',
      birthday: '2010-01-01',
      imgUrl: 'picture of gary',
      ownerId: testUserIds[0]
    });
  });

  test('throws not found if no such reptile', async () => {
    try {
      await Reptile.get(-1);
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    };
  });
});

/** Reptile.update(id) */
describe('update a reptile by id', () => {
  test('success', async () => {
    const updateData = {
      name: 'gury',
      subspecies: 'cool sea snail',
      birthday: '1997-05-01',
      imgUrl: 'a different image of gury'
    }
    const id = testReptileIds[0];
    const reptile = await Reptile.update(id, updateData);
    expect(reptile).toEqual({
      id: expect.any(Number),
      species: 'snail',
      ownerId: testUserIds[0],
      ...updateData
    });

    const result = await db.query(`
      SELECT id, name, species, subspecies, img_url AS "imgUrl", owner_id AS "ownerId"
      FROM reptiles
      WHERE name = 'gury'
    `);
    expect(result.rows[0]).toEqual({
      id: expect.any(Number),
      name: 'gury',
      species: 'snail',
      subspecies: 'cool sea snail',
      imgUrl: 'a different image of gury',
      ownerId: testUserIds[0]
    });
  });

  test('throws not found if no such reptile', async () => {
    const updateData = {
      name: 'gury',
      subspecies: 'cool sea snail',
      birthday: '1997-05-01',
      imgUrl: 'a different image of gury'
    };
    try {
      await Reptile.update(-1, updateData)
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  test('throws bad request if no data passed', async () => {
    try {
      await Reptile.update(-1)
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    };
  });
});

/** Reptile.delete(id) */
describe('delete a reptile by id', () => {
  test('success', async () => {
    const id = testReptileIds[0];
    const reptile = await Reptile.delete(id);
    expect(reptile).toEqual('gary');

    const res = await db.query(`SELECT name FROM reptiles WHERE name = 'gary'`);
    expect(res.rows.length).toEqual(0);
  });

  test('throws not found if no such reptile', async () => {
    try {
      await Reptile.delete(-1);
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  })
});