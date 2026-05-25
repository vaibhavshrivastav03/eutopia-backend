const express = require('express')

const router = express.Router()

const {
  createUser
} = require('../controllers/userController')

const authMiddleware =
  require('../middleware/authMiddleware')

const roleMiddleware =
  require('../middleware/roleMiddleware')

// ADMIN ONLY
router.post(
  '/create',
  authMiddleware,
  roleMiddleware('admin'),
  createUser
)

module.exports = router