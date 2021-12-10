const jwt = require('jsonwebtoken');
const { createToken } = require('./createToken');
const { SECRET_KEY } = require('../config');

describe('createToken', () => {
  test('works for non-admin', () => {
    const token = createToken({ id: 1, username: 'spongebob', isAdmin: false });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      id: 1,
      username: 'spongebob',
      isAdmin: false
    });
  });

  test('works for admin', () => {
    const token = createToken({ id: 2, username: 'mr-krabs', isAdmin: true });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      id: 2,
      username: 'mr-krabs',
      isAdmin: true
    });
  });
  
  test('works: default no admin', () => {
    const token = createToken({ id: 1, username: 'spongebob' });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      id: 1,
      username: 'spongebob',
      isAdmin: false
    });
  });
});