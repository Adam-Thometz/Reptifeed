const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jsonschema = require('jsonschema');
const userNewSchema = require('../schemas/userNewSchema.json');
const userUpdateSchema = require('../schemas/userUpdateSchema.json')
const { BadRequestError } = require('../expressError');
const { createToken } = require('../helpers/createToken');
const { ensureAdminOrCorrectUser, ensureAdmin } = require('../middleware/auth');

/** POST /users
 * 
 * Creates a new user (this is NOT the registration endpoint. Go to routes/auth.js for the register route). This route is for admins to create users and other admin.
 * 
 * Admin auth required
 */
router.post('/', ensureAdmin, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, userNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    };
    const user = await User.register(req.body);
    const token = createToken(user);
    return res.status(201).json({ user, token });
  } catch(err) {
    return next(err);
  };
});

/** GET /users
 * 
 * Returns a list of all users
 * 
 * Admin auth required
 */
router.get('/', ensureAdmin, async (req, res, next) => {
  try {
    const users = await User.getAll();
    return res.json({ users });
  } catch (err) {
    return next(err);
  };
});

/** GET /users/:id: id => { user }
 * 
 * Returns user based on id in params.
 * 
 * Admin/correct user auth required.
 */
router.get('/:id', ensureAdminOrCorrectUser, async (req, res, next) => {
  try {
    const user = await User.get(req.params.id);
    res.json({ user });
  } catch (err) {
    return next(err);
  };
});

/** PATCH /users/:id: (id, data) => { updatedUser }
 * 
 * Returns updated user.
 * 
 * Admin/correct user auth required.
*/
router.patch('/:id', ensureAdminOrCorrectUser, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    };
    const updatedUser = await User.update(+req.params.id, req.body);
    return res.json({ updatedUser });
  } catch (err) {
    return next(err);
  };
});

/** DELETE /users/:id id =>{ deleted: username }
 * 
 * Admin/correct user auth required
 */
router.delete('/:id', ensureAdminOrCorrectUser, async (req, res, next) => {
  try {
    const username = await User.delete(+req.params.id);
    return res.json({ deleted: username })
  } catch (err) {
    return next(err);
  }
})

module.exports = router;