const express = require('express')

const router = express.Router()

const {
  createVoiceTrigger,
  approveVoiceTrigger,
  getAllVoiceTriggers
} = require('../controllers/voiceController')

const authMiddleware =
  require('../middleware/authMiddleware')

const roleMiddleware =
  require('../middleware/roleMiddleware')

// USER + VOICE SYSTEM
router.post(
  '/trigger',
  authMiddleware,
  createVoiceTrigger
)

// ADMIN + FIREFIGHTER
router.put(
  '/approve/:id',
  authMiddleware,
  roleMiddleware(
    'admin',
    'firefighter'
  ),
  approveVoiceTrigger
)

// ADMIN + FIREFIGHTER
router.get(
  '/all',
  authMiddleware,
  roleMiddleware(
    'admin',
    'firefighter'
  ),
  getAllVoiceTriggers
)

module.exports = router