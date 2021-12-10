"use strict";

describe("config can come from env", () => {
  test('works', () => {
    process.env.SECRET_KEY = 'secrecy!';
    process.env.PORT = '5000';
    process.env.DATABASE_URL_1 = 'and';
    process.env.DATABASE_URL_2 = 'or';
    process.env.NODE_ENV = 'other';

    const config = require('./config');
    expect(config.SECRET_KEY).toBe('secrecy!');
    expect(config.PORT).toBe(5000);
    expect(config.getDatabaseUrl()).toBe('and');
    expect(config.DATABASE_URL_2).toBe('or');
    expect(config.BCRYPT_WORK_FACTOR).toBe(13);

    delete process.env.SECRET_KEY;
    delete process.env.PORT;
    delete process.env.BCRYPT_WORK_FACTOR;
    delete process.env.DATABASE_URL_1;
    delete process.env.DATABASE_URL_2;

    expect(config.getDatabaseUrl()).toBe('reptifeed');

    process.env.NODE_ENV = 'test';
    expect(config.getDatabaseUrl()).toBe('reptifeed_test');
  })
})