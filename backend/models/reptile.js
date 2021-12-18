"use strict";

const db = require('../db');
const dayjs = require('dayjs');
const { sqlForPartialUpdate } = require('../helpers/sqlPartial');
const { NotFoundError } = require('../expressError')

const all = 'id, name, species, subspecies, birthday, img_url AS "imgUrl", owner_id AS "ownerId"'

/** Reptile functions */

class Reptile {
  /** Create a new reptile
   * 
   * Returns { id, name, species, subspecies, owner_id }
   */
  static async create({ name, species, subspecies, birthday, imgUrl, ownerId }) {
    const result = await db.query(`
      INSERT INTO reptiles (name, species, subspecies, birthday, img_url, owner_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING ${all}
    `, [name, species, subspecies, birthday, imgUrl, ownerId]);

    const reptile = result.rows[0];
    reptile.birthday = dayjs(reptile.birthday).format('YYYY-MM-DD');
    return reptile;
  };
  
  /** Gets all reptiles
   * 
   * Returns [ { id, name, species, subspecies, birthday, imgUrl, ownerId }, ... ]
   */
  static async getAll() {
    const result = await db.query(`
      SELECT ${all}
      FROM reptiles
    `);

    const reptiles = result.rows;
    reptiles.forEach(r => r.birthday = dayjs(r.birthday).format('YYYY-MM-DD'));
    return reptiles;
  };

  /** Gets an single reptile by id
   * 
   * Returns { id, name, species, subspecies, birthday, imgUrl, ownerId }
   * 
   * Throws NotFoundError if reptile not found
   */
  static async get(id) {
    const result = await db.query(`
      SELECT ${all}
      FROM reptiles
      WHERE id = $1
    `, [id]);

    const reptile = result.rows[0];
    if (!reptile) throw new NotFoundError('Reptile not found');
    
    reptile.birthday = dayjs(reptile.birthday).format('YYYY-MM-DD');
    return reptile;
  };
  
  /** Gets all reptiles by owner
   * 
   * Returns [{ id, name, species, subspecies, birthday, imgUrl, ownerId }, ...]
   * 
   * Throws NotFoundError if user not found
   */
  static async getByUser(userId) {
    const result = await db.query(`
      SELECT ${all}
      FROM reptiles
      WHERE owner_id = $1
    `, [userId]);

    const reptiles = result.rows;
    if (!reptiles.length) throw new NotFoundError('User not found');
    
    reptiles.forEach(r => r.birthday = dayjs(r.birthday).format('YYYY-MM-DD'));
    return reptiles;
  };

  /** Update a reptile with id
   * 
   * This is a partial update, which means that not all fields need to be present
   * 
   * Data can include { name, subspecies, birthday, imgUrl }
   * 
   * Returns { id, name, species, subspecies, birthday, imgUrl, ownerId }
   * 
   * Throws NotFoundError if reptile not found
   */
  static async update(id, data = {}) {
    const { setCols, values } = sqlForPartialUpdate(data, {imgUrl: 'img_url'});

    const reptileIdSql = `$${values.length+1}`

    const querySql = `UPDATE reptiles
                      SET ${setCols}
                      WHERE id = ${reptileIdSql}
                      RETURNING id,
                                name,
                                species,
                                subspecies,
                                birthday,
                                img_url AS "imgUrl",
                                owner_id AS "ownerId"`
    const result = await db.query(querySql, [...values, id]);
    const reptile = result.rows[0];

    if (!reptile) throw new NotFoundError('No such reptile');

    reptile.birthday = dayjs(reptile.birthday).format('YYYY-MM-DD');
    return reptile;
  };

  /** Delete a reptile with id
   * 
   * Returns reptile name for frontend purposes
   * 
   * Throws NotFoiundError if reptile not found
   */
  static async delete(id) {
    const result = await db.query(`
      DELETE FROM reptiles
      WHERE id = $1
      RETURNING name
    `, [id]);
    const reptile = result.rows[0];

    if (!reptile) throw new NotFoundError('No such reptile');

    return reptile.name;
  }
};

module.exports = Reptile;