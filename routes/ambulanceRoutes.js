const express = require('express')

const router = express.Router()

const {
  triggerAmbulanceAlert,
  getAllAmbulanceAlerts
} = require('../controllers/ambulanceController')

const authMiddleware =
  require('../middleware/authMiddleware')

const roleMiddleware =
  require('../middleware/roleMiddleware')

// USER / ADMIN
router.post(
  '/trigger',
  authMiddleware,
  triggerAmbulanceAlert
)

// ADMIN + HOSPITAL
router.get(
  '/all',
  authMiddleware,
  roleMiddleware(
    'admin',
    'hospital'
  ),
  getAllAmbulanceAlerts
)

module.exports = router