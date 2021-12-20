"use strict";

const db = require('../db');
const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR } = require('../config')
const { NotFoundError, UnauthorizedError, BadRequestError } = require('../expressError');
const { sqlForPartialUpdate } = require('../helpers/sqlPartial');

/** User functions */

class User {
  /** Register new user
   * 
   * Returns { username, email, isAdmin }
   * 
   * Initially checks for duplicate. Throws BadRequestError if duplicate found.
   */
  static async register({ username, password, email, isAdmin }) {
    const duplicateCheck = await db.query(`
      SELECT username
      FROM users
      WHERE username = $1
    `, [username]);

    if (duplicateCheck.rows[0]) throw new BadRequestError(`${username} is already taken`);

    const hashedPass = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(`
      INSERT INTO users (username, password, email, is_admin)
      VALUES ($1, $2, $3, $4)
      RETURNING id, username, email, is_admin AS "isAdmin"
    `, [username, hashedPass, email, isAdmin || false]);

    const user = result.rows[0];
    return user;
  }

  /** Log in an existing user
   * 
   * Returns { username, email, isAdmin }
   * 
   * Throws UnauthorizedError is username not found or password is incorrect.
   */
  static async login({username, password}) {
    const result = await db.query(`
      SELECT id, username, password, email, is_admin AS "isAdmin"
      FROM users
      WHERE username = $1
    `, [username]);
    
    const user = result.rows[0];

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        delete user.password;
        return user;
      } else {
        throw new UnauthorizedError('Invalid password');
      };
    } else {
      throw new UnauthorizedError('Invalid username');
    };
  };

  /** Get all users
   * 
   * Returns [{ id, username, email, isAdmin }, ...]
   */
  static async getAll() {
    const result = await db.query(`
      SELECT id, username, email, is_admin AS "isAdmin"
      FROM users
    `);

    return result.rows;
  }
  
  /** Get a single user
   * 
   * Returns { id, username, email, isAdmin }
   * 
   * Throws NotFoundError if user not found
   */
  static async get(id) {
    const result = await db.query(`
      SELECT id, username, email, is_admin AS "isAdmin"
      FROM users
      WHERE id = $1
    `, [id]);

    const user = result.rows[0];

    if (!user) throw new NotFoundError('User not found');

    return user;
  };

  /** Update user data
   * 
   * This is a partial update function, meaning it will work if only some of the data is provided
   * 
   * Passed-in data can include: { username, password, email, isAdmin }
   * 
   * Returns { username, email, isAdmin }
   * 
   * Throws NotFoundError if no such user
   */
  static async update(id, data) {
    if (data.password) data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);

    const { setCols, values } = sqlForPartialUpdate(data, { isAdmin: "is_admin" });

    const userIdSql = `$${values.length+1}`

    const querySql = `UPDATE users
                      SET ${setCols}
                      WHERE id = ${userIdSql}
                      RETURNING id,
                                username,
                                email,
                                is_admin AS "isAdmin"`
    const result = await db.query(querySql, [...values, id]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError('No such user');

    delete user.password;
    return user;
  };

  static async delete(id) {
    const result = await db.query(`
      DELETE FROM users
      WHERE id = $1
      RETURNING username
    `, [id])

    const username = result.rows[0]

    if (!username) throw new NotFoundError('no such user');

    return username.username;
  }
};

module.exports = User;