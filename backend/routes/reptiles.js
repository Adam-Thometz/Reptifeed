const express = require('express');
const router = express.Router();
const Reptile = require('../models/reptile');
const jsonschema = require('jsonschema');
const reptileNewSchema = require('../schemas/reptileNewSchema.json')
const reptileUpdateSchema = require('../schemas/reptileUpdateSchema.json')
const { BadRequestError, UnauthorizedError } = require('../expressError');
const { ensureAdminOrCorrectOwner, ensureAdmin, ensureAdminOrCorrectUser } = require('../middleware/auth');

/** POST /reptiles
 * 
 * Creates a new reptile
 * 
 * Admin/correct owner auth required
 */
router.post('/', ensureAdminOrCorrectOwner, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, reptileNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    };

    const reptile = await Reptile.create(req.body);
    return res.status(201).json({ reptile });
  } catch (err) {
    return next(err);
  };
});

/** GET /reptiles
 * 
 * Returns a list of all reptiles
 * 
 * Admin auth required
 */
router.get('/', ensureAdmin, async (req, res, next) => {
  try {
    const reptiles = await Reptile.getAll();
    return res.json({ reptiles })
  } catch (err) {
    return next(err);
  };
});

/** GET /reptiles/:id
 * 
 * Returns a single reptile
 * 
 * Admin/correct owner auth required
 */
router.get('/:id', ensureAdminOrCorrectOwner, async (req, res, next) => {
  try {
    const reptile = await Reptile.get(+req.params.id);
    return res.json({ reptile })
  } catch (err) {
    return next(err);
  };
});

/** GET /reptiles/owner/:id
 * 
 * Returns all reptiles owned by a user
 * 
 * Admin/correct user auth required
 */
router.get('/owner/:id', ensureAdminOrCorrectUser, async (req, res, next) => {
  try {
    const reptiles = await Reptile.getByUser(+req.params.id);
    return res.json({ reptiles })
  } catch (err) {
    return next(err);
  };
});

/** PATCH /reptiles/:id
 * 
 * Edits a single reptile. Valid fields are name, subspecies, birthday, and imgUrl
 * 
 * Admin/correct owner auth required
 */
router.patch('/:id', ensureAdminOrCorrectOwner, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, reptileUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const reptile = await Reptile.update(req.params.id, req.body);
    return res.json({ reptile })
  } catch (err) {
    return next(err);
  };
});

/** DELETE /reptiles/:id
 * 
 * Deletes a single reptile
 * 
 * Admin/correct owner auth required
 */
router.delete('/:id', ensureAdminOrCorrectOwner, async (req, res, next) => {
  try {
    const reptile = await Reptile.delete(req.params.id);
    return res.json({ deleted: reptile });
  } catch (err) {
    return next(err);
  };
});

module.exports = router;