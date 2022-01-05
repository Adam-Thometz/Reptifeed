"use strict";

const request = require('supertest');

const app = require('./app');
const db = require('./db');
const { commonAfterAll } = require('./routes/_testCommon');

test('throws not found for 404', async () => {
  const resp = await request(app).get('/shiver-me-timbers');
  expect(resp.statusCode).toBe(404);
});

test('throws not found for 404 (test stack print)', async () => {
  process.env.NODE_ENV = '';
  const resp = await request(app).get('/shiver-me-timbers');
  expect(resp.statusCode).toBe(404);
  delete process.env.NODE_ENV;
});

commonAfterAll(() => {
  db.end();
});