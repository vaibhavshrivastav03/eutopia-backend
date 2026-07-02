const express =
  require('express')

const router =
  express.Router()

const {
  createHospitalRecord,
  getHospitalRecords,
  getAllHospitalRecords
} = require(
  '../controllers/hospitalRecordController'
)

const authMiddleware =
  require(
    '../middleware/authMiddleware'
  )

const ownershipMiddleware =
  require(
    '../middleware/ownershipMiddleware'
  )

// CREATE HOSPITAL RECORD
router.post(
  '/create',
  authMiddleware,
  createHospitalRecord
)

// GET USER HOSPITAL RECORDS
router.get(
  '/user/:userId',
  authMiddleware,
  ownershipMiddleware,
  getHospitalRecords
)

// GET ALL HOSPITALS
router.get(
  '/all',
  getAllHospitalRecords
)

module.exports = router