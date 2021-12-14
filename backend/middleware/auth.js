"use strict";

/** This middleware is used for checking if a user is admin, is correct user for certain routes */

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const db = require('../db');
const { UnauthorizedError, NotFoundError } = require('../expressError');

/** authenticateJWT: used to provide a token in request header.
 * 
 * If there is a token, it is verified and, if valid, store its payload onto res.locals
 * 
 * If no token is provided, next() is called for any upcoming middleware to handle.
 */
function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }
    return next();
  } catch(err) {
    return next();
  };
};

/** ensureLoggedIn: used to check if a user is logged in
 * 
 * If not logged in, throw UnauthorizedError
 */
function ensureLoggedIn(req, res, next) {
  try {
    if (!res.locals.user) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err)
  };
};

/** ensureAdmin: used to check admin status of user
 * 
 * If user is not admin, throw UnauthorizedError
*/
function ensureAdmin(req, res, next) {
  try {
    const valid = res.locals.user && res.locals.user.isAdmin
    if (!valid) throw new UnauthorizedError()
    return next();
  } catch (err) {
    return next(err)
  };
};

/** ensureAdminOrCorrectUser: checks if user is admin or user whose id matches req.params. Meant for user routes
 * 
 * If user is neither admin nor correct user, throw UnauthorizedError
 */
function ensureAdminOrCorrectUser(req, res, next) {
  try {
    const user = res.locals.user;
    if (!(user && (user.isAdmin || user.id === +req.params.id))) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

/** ensureAdminOrCorrectOwner: special middleware function for reptile routes
 *  
 * Used to check whether the ownerId for the selected reptile matches the correct user. Fine if admin.
 * 
 * If mismatch, throws UnauthorizedError
 */
 async function ensureAdminOrCorrectOwner(req, res, next) {
  try {
    const user = res.locals.user;

    if (req.method === "POST") {
      if (!user.isAdmin && (user.id !== req.body.ownerId)) {
        throw new UnauthorizedError('You cannot create a reptile for someone else.');
      };
    };

    const resp = await db.query(`
      SELECT owner_id AS "ownerId"
      FROM reptiles
      WHERE id = $1
    `, [req.params.id])
    if (!resp.rows.length) throw new NotFoundError();
    const ownerId = resp.rows[0].ownerId
    if (!(user && (user.isAdmin || user.id === ownerId))) {
      throw new UnauthorizedError();
    };
    return next();
  } catch (err) {
    return next(err);
  };
};

module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  ensureAdmin,
  ensureAdminOrCorrectUser,
  ensureAdminOrCorrectOwner
}