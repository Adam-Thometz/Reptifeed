const express = require('express');
const router = express.Router();
const FoodApi = require('../models/foodApi');
const { BadRequestError } = require('../expressError')
const { ensureLoggedIn } = require('../middleware/auth');

/** GET /api/foods 
 * 
 * Route to get all foods
*/
router.get('/:species/foods', ensureLoggedIn, async (req, res, next) => {
  try {
    const foods = await FoodApi.getAllFoods(req.params.species);
    return res.json({ foods });
  } catch (err) {
    return next(err);
  };
});

/** GET /api/foods/:food 
 * 
 * Route to get a specific food
*/
router.get('/:species/foods/:food', ensureLoggedIn, async (req, res, next) => {
  try {
    const food = await FoodApi.getFood(req.params.food, req.params.species);
    return res.json({ food });
  } catch (err) {
    return next(err);
  };
});

/** GET /api/types/:type
 * 
 * Route to get foods by type (e.g., protein, vegetables, etc)
 */
router.get('/:species/types/:type', ensureLoggedIn, async (req, res, next) => {
  try {
    const foods = await FoodApi.getByType(req.params.type, req.params.species);
    return res.json({ foods });
  } catch (err) {
    return next(err);
  };
});

/** GET /api/treats/
 * 
 * Route to get all treats
 */
router.get('/:species/treats', ensureLoggedIn, async (req, res, next) => {
  try {
    const treats = await FoodApi.getAllTreats(req.params.species);
    return res.json({ treats });
  } catch (err) {
    return next(err);
  };
});

/** GET /api/treats/:type
 * 
 * Route to get treats by type (e.g., protein, vegetables, etc)
 */
router.get('/:species/types/:type', ensureLoggedIn, async (req, res, next) => {
  try {
    const treats = await FoodApi.getTreatsByType(req.params.type, req.params.species);
    return res.json({ treats });
  } catch (err) {
    return next(err);
  };
});

module.exports = router;