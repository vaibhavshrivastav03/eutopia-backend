const express =
  require('express')

const router =
  express.Router()

const {
  createMedicalRecord,
  getMedicalRecords
} = require(
  '../controllers/medicalRecordController'
)

const authMiddleware =
  require(
    '../middleware/authMiddleware'
  )

const ownershipMiddleware =
  require(
    '../middleware/ownershipMiddleware'
  )

// CREATE MEDICAL RECORD
router.post(
  '/create',
  authMiddleware,
  createMedicalRecord
)

// GET USER MEDICAL RECORDS
router.get(
  '/user/:userId',
  authMiddleware,
  ownershipMiddleware,
  getMedicalRecords
)

module.exports = router