const express = require('express')

const router = express.Router()

const authMiddleware =
  require('../middleware/authMiddleware')

const roleMiddleware =
  require('../middleware/roleMiddleware')

const {
  scanBraceletMedical,
  verifyMedicalPasscode
} = require('../controllers/hospitalController')

router.get(
  '/scan/:uid',
  scanBraceletMedical
)

router.post(
  '/verify-passcode',
  authMiddleware,
  roleMiddleware(
    'admin',
    'hospital'
  ),
  verifyMedicalPasscode
)

module.exports = router