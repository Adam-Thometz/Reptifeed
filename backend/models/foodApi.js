"use strict";

const db = require('../db');
const { NotFoundError, BadRequestError } = require('../expressError');

const all = 'name, type, frequency, image, is_treat AS "isTreat", tips'
const types = ['protein', 'vegetable', 'fruit', 'supplement']
const regex = /-/g

class FoodApi {
  /** Get all foods
   * 
   * Returns [{ name, type, frequency, image, isTreat, tips }, ... ]
   */
  static async getAllFoods(species, query) {
    const speciesSql = species.replace(regex, '_');
    const whereStatement = query ? `WHERE name ILIKE '%${query}%'` : '';
    const result = await db.query(`
      SELECT ${all} FROM ${speciesSql}_diet ${whereStatement}
    `);

    const foods = result.rows;
    
    return foods;
  };

  /** Get a specific food
   * 
   * Returns { name, type, frequency, image, isTreat, tips }
   */
  static async getFood(foodName, species) {
    const speciesSql = species.replace(regex, '_');
    const foodSql = foodName.replace(regex, ' ')
    const result = await db.query(`
      SELECT ${all}
      FROM ${speciesSql}_diet
      WHERE name = $1
    `, [foodSql])

    const food = result.rows[0];
    if (!food) throw new NotFoundError('No foods found');

    return food;
  };

  static async getByType(type, species) {
    if (types.indexOf(type) === -1) throw new BadRequestError('Invalid food type!')
    const speciesSql = species.replace(regex, '_');
    const result = await db.query(`
      SELECT ${all}
      FROM ${speciesSql}_diet
      WHERE type = $1
    `, [type]);

    const foods = result.rows;

    return foods;
  };

  static async getAllTreats(species) {
    const speciesSql = species.replace(regex, '_');
    const result = await db.query(`
      SELECT ${all}
      FROM ${speciesSql}_diet
      WHERE is_treat = true
    `);

    const treats = result.rows;

    return treats
  };
};

module.exports = FoodApi;