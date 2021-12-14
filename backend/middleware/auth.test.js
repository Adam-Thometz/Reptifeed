"use strict";

const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../expressError');

const { SECRET_KEY } = require('../config')
const testJwt = jwt.sign({ username: "my-leg", isAdmin: false }, SECRET_KEY);
const badJwt = jwt.sign({ username: "my-leg", isAdmin: false }, "MY_LEG");

const {
  authenticateJWT,
  ensureLoggedIn,
  ensureAdmin,
  ensureAdminOrCorrectUser,
  ensureAdminOrCorrectOwner
} = require('./auth');

describe('authenticateJWT', () => {
  test('works w/ header', () => {
    expect.assertions(2);
    const req = { headers: { authorization: `Bearer ${testJwt}` } };
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({
      user: {
        iat: expect.any(Number),
        username: "my-leg",
        isAdmin: false
      }
    });
  });

  test('works no header', () => {
    expect.assertions(2);
    const req = {};
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({});
  })
  
  test('works invalid token', () => {
    expect.assertions(2);
    const req = { headers: { authorization: `Bearer ${badJwt}` } };
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({});
  });
});

describe('ensureLoggedIn', () => {
  test('works', () => {
    expect.assertions(1);
    const req = {};
    const res = { locals: { user: { username: "ms-puff", isAdmin: false } } };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    ensureLoggedIn(req, res, next);
  });

  test('throws unauth if anon', () => {
    expect.assertions(1);
    const req = {};
    const res = { locals: {} };
    const next = function (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    ensureLoggedIn(req, res, next);
  })
});

describe('ensureAdmin', () => {
  test('works', () => {
    expect.assertions(1);
    const req = {}
    const res = { locals: { user: { username: "ms-puff", isAdmin: true } } };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    ensureAdmin(req, res, next);
  });

  test('throws unauth if not admin', () => {
    expect.assertions(1);
    const req = {}
    const res = { locals: { user: { username: "ms-puff", isAdmin: false } } };
    const next = function (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    ensureAdmin(req, res, next);
  });
  
  test('throws unauth if anon', () => {
    expect.assertions(1);
    const req = {}
    const res = { locals: {} };
    const next = function (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    ensureAdmin(req, res, next);
  });
});

describe('ensureAdminOrCorrectUser', () => {
  test('works for correct user', () => {
    expect.assertions(1);
    const req = { params: { id: 1 } };
    const res = { locals: { user: { id: 1, username: 'ms-puff', isAdmin: false } } };
    const next = function(err) {
      expect(err).toBeFalsy();
    };
    ensureAdminOrCorrectUser(req, res, next);
  });
  
  test('works for admin', () => {
    expect.assertions(1);
    const req = { params: { id: 1 } };
    const res = { locals: { user: { id: 2, username: 'mr-krabs', isAdmin: true } } };
    const next = function(err) {
      expect(err).toBeFalsy();
    };
    ensureAdminOrCorrectUser(req, res, next);
  });
  
  test('throws unauth for mismastch', () => {
    expect.assertions(1);
    const req = { params: { id: 2 } };
    const res = { locals: { user: { id: 1, username: 'ms-puff', isAdmin: false } } };
    const next = function(err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    ensureAdminOrCorrectUser(req, res, next);
  });
  
  test('throws unauth for anon', () => {
    expect.assertions(1);
    const req = { params: { id: 1 } };
    const res = { locals: {} };
    const next = function(err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    ensureAdminOrCorrectUser(req, res, next);
  });
});

describe('ensureAdminOrCorrectOwner', () => {
  test('works for correct user', async () => {
    expect.assertions(1);
    const req = {
      body: {
        name: 'mary',
        species: 'snail',
        subspecies: 'sea snail',
        birthday: '2021-05-01',
        imgUrl: 'picture of mary',
        ownerId: 1
      }
    };
    const res = { locals: { user: { id: 1, username: 'ms-puff', isAdmin: false } } };
    const next = function(err) {
      expect(err).toBeFalsy();
    };
    ensureAdminOrCorrectOwner(req, res, next);
  });

  test('works for admin', async () => {
    expect.assertions(1);
    const req = {
      body: {
        name: 'mary',
        species: 'snail',
        subspecies: 'sea snail',
        birthday: '2021-05-01',
        imgUrl: 'picture of mary',
        ownerId: 1
      }
    };
    const res = { locals: { user: { id: 2, username: 'mr-krabs', isAdmin: true } } };
    const next = function(err) {
      expect(err).toBeFalsy();
    };
    ensureAdminOrCorrectOwner(req, res, next);
  });

  test('throws unauth for mismatch', async () => {
    expect.assertions(1);
    const req = {
      body: {
        name: 'mary',
        species: 'snail',
        subspecies: 'sea snail',
        birthday: '2021-05-01',
        imgUrl: 'picture of mary',
        ownerId: 1
      }
    };
    const res = { locals: { user: { id: 3, username: 'plankton', isAdmin: false } } };
    const next = function(err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    ensureAdminOrCorrectOwner(req, res, next);
  });
});