const express = require('express')

const router = express.Router()

const {
  triggerFireAlert,
  getAllFireAlerts
} = require('../controllers/fireController')

const authMiddleware =
  require('../middleware/authMiddleware')

const roleMiddleware =
  require('../middleware/roleMiddleware')

// USER + ADMIN
router.post(
  '/trigger',
  authMiddleware,
  triggerFireAlert
)

// ADMIN + FIREFIGHTER
router.get(
  '/all',
  authMiddleware,
  roleMiddleware(
    'admin',
    'firefighter'
  ),
  getAllFireAlerts
)

module.exports = router