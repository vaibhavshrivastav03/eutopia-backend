const express = require('express')

const router = express.Router()

const {
  registerUser,
  loginUser
} = require('../controllers/authController')

const validate =
  require('../middleware/validateMiddleware')

const {
  registerSchema,
  loginSchema
} = require(
  '../validations/authValidation'
)

// PUBLIC
router.post(
  '/register',
  validate(registerSchema),
  registerUser
)

// PUBLIC
router.post(
  '/login',
  validate(loginSchema),
  loginUser
)

module.exports = router