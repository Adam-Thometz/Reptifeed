const express = require('express');
const router = express.Router();
const { ensureAdminOrCorrectUser } = require('../middleware/auth');
const Pantry = require('../models/pantry');
const jsonschema = require('jsonschema')
const pantryNewFoodSchema = require('../schemas/pantryNewFoodSchema.json');
const { BadRequestError } = require('../expressError');

/** GET /pantries/:id
 * 
 * See user's pantry
 * 
 * Admin/correct user auth required
*/
router.get('/:id', ensureAdminOrCorrectUser, async (req, res, next) => {
  try {
    const pantry = await Pantry.getPantry(req.params.id);
    return res.json({ pantry });
  } catch (err) {
    return next(err);
  }
})

/** POST /pantries/:id
 * 
 * Adds food to user's pantry
 * 
 * Admin/correct user auth required
 */
router.post('/:id', ensureAdminOrCorrectUser, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, pantryNewFoodSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    };

    const newFood = await Pantry.addFood(req.body, req.params.id);
    return res.json({ newFood });
  } catch (err) {
    return next(err);
  };
});

/** DELETE /pantries/:id/:food
 * 
 * Removes food from user's pantry
 * 
 * Admin/correct user auth required
 */
router.delete('/:id/:food', ensureAdminOrCorrectUser, async (req, res, next) => {
  try {
    const { food, id } = req.params
    const foodName = food.replace(/-/g, ' ')
    await Pantry.removeFood(foodName, id);
    return res.json({ deleted: `${foodName} from pantry of user #${id}` })
  } catch (err) {
    return next(err);
  };
});

module.exports = router;