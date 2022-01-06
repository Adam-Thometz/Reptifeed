"use strict";

const express = require('express');
const router = express.Router();
const FoodApi = require('../models/foodApi');
const { ensureLoggedIn } = require('../middleware/auth');

/** GET /api/:species/foods 
 * 
 * Route to get all foods for a spceific species
 * 
 * Can be used to search for foods as well.
*/
router.get('/:species/foods', ensureLoggedIn, async (req, res, next) => {
  const query = req.query[0] || null;
  try {
    const foods = await FoodApi.getAllFoods(req.params.species, query);
    return res.json({ foods });
  } catch (err) {
    return next(err);
  };
});

/** GET /api/:species/foods/:food 
 * 
 * Route to get a specific food.
*/
router.get('/:species/foods/:food', ensureLoggedIn, async (req, res, next) => {
  try {
    const food = await FoodApi.getFood(req.params.food, req.params.species);
    return res.json({ food });
  } catch (err) {
    return next(err);
  };
});

/** GET /api/:species/types/:type
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

/** GET /api/:species/treats/
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

module.exports = router;