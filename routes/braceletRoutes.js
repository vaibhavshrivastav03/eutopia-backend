const express = require('express')

const router = express.Router()

const {
  assignBracelet,
  scanBracelet,
  switchBraceletUser
} = require('../controllers/braceletController')

const authMiddleware =
  require('../middleware/authMiddleware')

const roleMiddleware =
  require('../middleware/roleMiddleware')

// ADMIN ONLY
router.post(
  '/assign',
  authMiddleware,
  roleMiddleware('admin', 'user'),
  assignBracelet
)

// PUBLIC ACCESS
router.get(
  '/scan/:uid',
  scanBracelet
)

// ADMIN ONLY
router.put(
  '/switch-user',
  authMiddleware,
  roleMiddleware('admin', 'user'),
  switchBraceletUser
)

module.exports = router