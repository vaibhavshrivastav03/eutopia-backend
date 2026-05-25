const express = require('express')

const router = express.Router()

const {
  registerUser,
  loginUser
} = require('../controllers/authController')

// PUBLIC
router.post(
  '/register',
  registerUser
)

// PUBLIC
router.post(
  '/login',
  loginUser
)

module.exports = router