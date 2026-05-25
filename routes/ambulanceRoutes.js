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

const validate =
  require('../middleware/validateMiddleware')

const {
  ambulanceSchema
} = require(
  '../validations/emergencyValidation'
)

// USER / ADMIN
router.post(
  '/trigger',
  authMiddleware,
  validate(ambulanceSchema),
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