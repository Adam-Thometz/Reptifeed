"use strict";

const request = require('supertest');
const app = require('../app');

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testUserIds, // use idx 0 for user, idx 1 for admin
  tokens, // use idx 0 for user, idx 1 for admin
  testReptileIds
} = require('./_testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/** POST /reptiles */
describe('create new reptile', () => {
  test('works for correct user', async () => {
    const newReptile = {
      name: "mary",
      species: "snail",
      subspecies: "mean sea snail",
      birthday: '2010-05-01',
      imgUrl: 'image of mary',
      ownerId: testUserIds[0]
    }
    const token = tokens[0];
    const res = await request(app)
      .post('/reptiles')
      .send(newReptile)
      .set('authorization', `Bearer ${token}`);
    expect(res.body).toEqual( { reptile: { ...newReptile, id: expect.any(Number) } });
  });

  test('works for admin', async () => {
    const newReptile = {
      name: "mary",
      species: "snail",
      subspecies: "mean sea snail",
      birthday: '2010-05-01',
      imgUrl: 'image of mary',
      ownerId: testUserIds[0]
    };
    const token = tokens[1];
    const res = await request(app)
      .post('/reptiles')
      .send(newReptile)
      .set('authorization', `Bearer ${token}`);
    expect(res.body).toEqual( { reptile: { ...newReptile, id: expect.any(Number) } });
  });

  test('throws unauth for incorrect user', async () => {
    const newReptile = {
      name: "mary",
      species: "snail",
      subspecies: "mean sea snail",
      birthday: '2010-05-01',
      imgUrl: 'image of mary',
      ownerId: testUserIds[1]
    };
    const token = tokens[0];
    const res = await request(app)
      .post('/reptiles')
      .send(newReptile)
      .set('authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(401);
  })

  test('throws unauth for anon', async () => {
    const newReptile = {
      name: "mary",
      species: "snail",
      subspecies: "mean sea snail",
      birthday: '2010-05-01',
      imgUrl: 'image of mary',
      ownerId: testUserIds[0]
    };
    const res = await request(app)
      .post('/reptiles')
      .send(newReptile);
    expect(res.statusCode).toEqual(401);
  });

  test('throws bad request for missing information', async () => {
    const newReptile = {
      name: "mary",
      imgUrl: 'image of mary',
      ownerId: testUserIds[0]
    };
    const token = tokens[0]
    const res = await request(app)
      .post('/reptiles')
      .send(newReptile)
      .set('authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(400);
  })
});

/** GET /reptiles */
describe('get all reptiles', () => {
  test('works for admin', async () => {
    const token = tokens[1];
    const res = await request(app)
      .get('/reptiles')
      .set('authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      reptiles: [
        {
          id: expect.any(Number),
          name: 'gary',
          species: 'snail',
          subspecies: 'sea snail',
          birthday: '2010-01-01',
          imgUrl: 'picture of gary',
          ownerId: testUserIds[0]
        },
        {
          id: expect.any(Number),
          name: 'larry',
          species: 'snail',
          subspecies: 'mean sea snail',
          birthday: '2015-01-01',
          imgUrl: 'picture of larry',
          ownerId: testUserIds[1]
        }
      ]
    });
  });

  test('throws unauth for non-admin users', async () => {
    const token = tokens[0];
    const res = await request(app)
      .get('/reptiles')
      .set('authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(401);
  });
  
  test('throws unauth for anon', async () => {
    const res = await request(app)
      .get('/reptiles')
    expect(res.statusCode).toEqual(401);
  });
});

describe('get reptile by id', () => {
  test('success for user', async  () => {
    const id = testReptileIds[0];
    const token = tokens[0];
    const res = await request(app)
      .get(`/reptiles/${id}`)
      .set('authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      reptile: {
        id,
        name: 'gary',
        species: 'snail',
        subspecies: 'sea snail',
        birthday: '2010-01-01',
        imgUrl: 'picture of gary',
        ownerId: testUserIds[0]
      }
    });
  });

  test('success for admin', async  () => {
    const id = testReptileIds[0];
    const token = tokens[1];
    const res = await request(app)
      .get(`/reptiles/${id}`)
      .set('authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      reptile: {
        id: expect.any(Number),
        name: 'gary',
        species: 'snail',
        subspecies: 'sea snail',
        birthday: '2010-01-01',
        imgUrl: 'picture of gary',
        ownerId: testUserIds[0]
      }
    });
  });

  test('throws unauth if neither admin nor correct user', async () => {
    const id = testReptileIds[1];
    const token = tokens[0];
    const res = await request(app)
      .get(`/reptiles/${id}`)
      .set('authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(401);
  });

  test('throws unauth if anon', async () => {
    const id = testReptileIds[1];
    const res = await request(app)
      .get(`/reptiles/${id}`)
    expect(res.statusCode).toEqual(401);
  });

  test('throws not found if no such reptile', async () => {
    const token = tokens[1];
    const res = await request(app)
      .get('/reptiles/-1')
      .set('authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(404);
  });
});

/** GET /reptiles/owner/:id */
describe('get reptiles by owner', () => {
  test('success for user', async  () => {
    const ownerId = testUserIds[0];
    const token = tokens[0];
    const res = await request(app)
      .get(`/reptiles/owner/${ownerId}`)
      .set('authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      reptiles: [{
        id: expect.any(Number),
        name: 'gary',
        species: 'snail',
        subspecies: 'sea snail',
        birthday: '2010-01-01',
        imgUrl: 'picture of gary',
        ownerId
      }]
    });
  });

  test('success for admin', async  () => {
    const ownerId = testUserIds[0];
    const token = tokens[1];
    const res = await request(app)
      .get(`/reptiles/owner/${ownerId}`)
      .set('authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      reptiles: [{
        id: expect.any(Number),
        name: 'gary',
        species: 'snail',
        subspecies: 'sea snail',
        birthday: '2010-01-01',
        imgUrl: 'picture of gary',
        ownerId
      }]
    });
  });

  test('throws unauth if neither admin nor correct user', async () => {
    const id = testUserIds[1];
    const token = tokens[0];
    const res = await request(app)
      .get(`/reptiles/owner/${id}`)
      .set('authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(401);
  });

  test('throws unauth if anon', async () => {
    const id = testUserIds[1];
    const res = await request(app)
      .get(`/reptiles/owner/${id}`)
    expect(res.statusCode).toEqual(401);
  });
});


describe('update a reptile by id', () => {
  test('success for owner', async  () => {
    const id = testReptileIds[0];
    const token = tokens[0];
    const res = await request(app)
      .patch(`/reptiles/${id}`)
      .send({ birthday: '1997-05-01' })
      .set('authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      reptile: {
        id,
        name: 'gary',
        species: 'snail',
        subspecies: 'sea snail',
        birthday: '1997-05-01',
        imgUrl: 'picture of gary',
        ownerId: testUserIds[0]
      }
    });
  });

  test('success for admin', async  () => {
    const id = testReptileIds[0];
    const token = tokens[1];
    const res = await request(app)
      .patch(`/reptiles/${id}`)
      .send({ birthday: '1997-05-01' })
      .set('authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      reptile: {
        id,
        name: 'gary',
        species: 'snail',
        subspecies: 'sea snail',
        birthday: '1997-05-01',
        imgUrl: 'picture of gary',
        ownerId: testUserIds[0]
      }
    });
  });

  test('throws unauth if not owner', async () => {
    const id = testReptileIds[0];    
    const token = tokens[0];
    const res = await request(app)
      .patch(`/reptiles/${id+1}`)
      .send({ name: 'gery' })
      .set('authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(401);
  });

  test('throws unauth if anon', async () => {
    const id = testReptileIds[0];   
    const res = await request(app)
      .patch(`/reptiles/${id}`)
      .send({ name: 'gery' });
    expect(res.statusCode).toEqual(401);
  });

  test('throws bad request if invalid data', async () => {
    const id = testReptileIds[0];
    const token = tokens[0];
    const res = await request(app)
      .patch(`/reptiles/${id}`)
      .send({ date: 'today-is-monday' })
      .set('authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(400);
  });
  
  test('throws bad request if invalid fields', async () => {
    const id = testReptileIds[0];
    const token = tokens[0];
    const res = await request(app)
      .patch(`/reptiles/${id}`)
      .send({ neverGonna: 'let-you-down' })
      .set('authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(400);
  });

  test('throws not found if no such reptile', async () => {
    const token = tokens[0];
    const res = await request(app)
      .patch('/reptiles/-1')
      .set('authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(404)
  });
});

describe('delete a reptile by id', () => {
  test('success for owner', async () => {
    const id = testReptileIds[0];
    const token = tokens[0];
    const res = await request(app)
      .delete(`/reptiles/${id}`)
      .set('authorization', `Bearer ${token}`)
    expect(res.body).toEqual({ deleted: 'gary' });
  });
  
  test('success for admin', async () => {
    const id = testReptileIds[0];
    const token = tokens[1];
    const res = await request(app)
      .delete(`/reptiles/${id}`)
      .set('authorization', `Bearer ${token}`)
    expect(res.body).toEqual({ deleted: 'gary' });
  });

  test('throws unauth if neither owner nor admin', async () => {
    const id = testReptileIds[1];
    const token = tokens[0];
    const res = await request(app)
      .delete(`/reptiles/${id}`)
      .set('authorization', `Bearer ${token}`)
    expect(res.statusCode).toEqual(401);
  });

  test('throws not found if no such reptile', async () => {
    const token = tokens[1];
    const res = await request(app)
      .delete('/reptiles/-1')
      .set('authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(404);
  });
});
