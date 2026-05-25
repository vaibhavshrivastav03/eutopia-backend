const express = require('express')

const router = express.Router()

const authMiddleware =
  require('../middleware/authMiddleware')

const roleMiddleware =
  require('../middleware/roleMiddleware')

const {
  getDashboardOverview,
  updateEmergencyStatus
} = require('../controllers/dashboardController')

router.get(
  '/overview',
  authMiddleware,
  roleMiddleware(
    'admin',
    'firefighter',
    'hospital'
  ),
  getDashboardOverview
)

router.put(
  '/update-status/:id',
  authMiddleware,
  roleMiddleware(
    'admin',
    'firefighter'
  ),
  updateEmergencyStatus
)

module.exports = router