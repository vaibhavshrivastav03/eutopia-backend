const express =
  require('express')

const router =
  express.Router()

const {
  identifyPatient,
  getAllIdentifications
} = require(
  '../controllers/hospitalIdentificationController'
)

const authMiddleware =
  require('../middleware/authMiddleware')

const roleMiddleware =
  require('../middleware/roleMiddleware')

// HOSPITAL / ADMIN
router.post(
  '/identify',
  authMiddleware,
  roleMiddleware(
    'admin',
    'hospital'
  ),
  identifyPatient
)

// HOSPITAL / ADMIN
router.get(
  '/all',
  authMiddleware,
  roleMiddleware(
    'admin',
    'hospital'
  ),
  getAllIdentifications
)

module.exports = router