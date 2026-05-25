const express = require('express')

const router = express.Router()

const {
  createEmergencyContact,
  getUserEmergencyContacts
} = require('../controllers/emergencyContactController')

const authMiddleware =
  require('../middleware/authMiddleware')

const roleMiddleware =
  require('../middleware/roleMiddleware')

// USER + ADMIN
router.post(
  '/create',
  authMiddleware,
  createEmergencyContact
)

// USER + ADMIN + HOSPITAL
router.get(
  '/user/:userId',
  authMiddleware,
  roleMiddleware(
    'user',
    'admin',
    'hospital'
  ),
  getUserEmergencyContacts
)

module.exports = router