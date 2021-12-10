"use strict";

/** This middleware is used for checking if a user is admin, is correct user for certain routes */

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const { UnauthorizedError } = require('../expressError');

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

module.exports = {
  authenticateJWT,
  ensureAdmin,
  ensureAdminOrCorrectUser
}