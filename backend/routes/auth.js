"use strict";

/** Auth routes for logging in and registering */

const jsonschema = require('jsonschema')
const User = require('../models/user');
const express = require('express');
const router = new express.Router();
const userNewSchema = require('../schemas/userNewSchema.json')
const userLoginSchema = require('../schemas/userLoginSchema.json')
const { createToken } = require('../helpers/createToken');
const { BadRequestError } = require('../expressError');

/** POST /auth/register: { user } => { token }
 * 
 * { username, password, email } must be in req.body
 * 
 * Returns JWT for authenticating further requests.
 * 
 * No admin auth required to register
 */

router.post('/register', async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, userNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const newUser = await User.register({ ...req.body, isAdmin: false });
    const token = createToken(newUser);
    return res.status(201).json({ token });
  } catch(err) {
    return next(err);
  };
});

/** POST /auth/login: { username, password } => { token }
 * 
 * { username, password } must be in req.body
 * 
 * Returns JWT for authenticating further requests.
 * 
 * No admin auth required to log in
 */

router.post('/login', async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, userLoginSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const { username, password } = req.body;
    const user = await User.login(username, password);
    const token = createToken(user);
    return res.json({ token })
  } catch (err) {
    return next(err);
  }
})

module.exports = router;