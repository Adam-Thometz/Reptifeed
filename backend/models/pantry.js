"use strict";

const db = require('../db');
const { NotFoundError } = require('../expressError');

const all = 'owner_id AS "ownerId", name, type, frequency, image, is_treat AS "isTreat", tips';

/** Pantry functions */

class Pantry {
  /** See user's pantry
   * 
   * [{ name, type, frequency, image treat, tips }, ...]
   */
  static async getPantry(userId) {
    const result = await db.query(`
      SELECT ${all}
      FROM pantries
      WHERE owner_id = $1
    `, [userId])

    const pantry = result.rows;
    return pantry;
  }

  /** Add food to user's pantry
   * 
   * Returns { ownerId, name, type, frequency, treat, tips }
   */
  static async addFood(food, userId) {
    const { name, type, frequency, image, isTreat, tips } = food;
    const result = await db.query(`
      INSERT INTO pantries (owner_id, name, type, frequency, image, is_treat, tips)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING ${all}
    `, [userId, name, type, frequency, image, isTreat, tips]);

    const foodRes = result.rows[0];
    return foodRes;
  };

  /** Remove food from user's pantry
   * 
   * Returns undefined
   */
  static async removeFood(foodName, userId) {
    const res = await db.query(`
      DELETE FROM pantries
      WHERE owner_id = $1 AND name = $2
      RETURNING name
    `, [userId, foodName]);

    if (!res) throw new NotFoundError('Food not found in pantry');
  };

  static async getMeal() {

  };
};

module.exports = Pantry;