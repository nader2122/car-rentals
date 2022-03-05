const { body, validationResult } = require('express-validator');

const registerRules =()=>[
  body('firstName', 'firstName is required').notEmpty(),
  body('lastName', 'lastName is required').notEmpty(),
  body('email', 'email should be email').isEmail(),
  body('password', 'should be between 3 and 20 char').isLength({
    min: 3,
    max: 20,
  })];
const loginRules =()=>[
  body('email', 'email should be email').isEmail(),
  body('password', 'should be between 3 and 20 char').isLength({
    min: 3,
    max: 20,
  })];

const validate =(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ errors: errors.array() });
  }
  next();
};

module.exports = { loginRules, registerRules, validate };
