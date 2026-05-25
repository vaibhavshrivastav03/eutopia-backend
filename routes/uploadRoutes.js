const express = require('express')

const router = express.Router()

const upload = require('../middleware/multer')

const {
  uploadProfilePhoto,
  uploadVoiceRecording
} = require('../controllers/uploadController')

const authMiddleware =
  require('../middleware/authMiddleware')

// USER + ADMIN
router.post(
  '/profile-photo',
  authMiddleware,
  upload.single('file'),
  uploadProfilePhoto
)

// USER
router.post(
  '/voice-recording',
  authMiddleware,
  upload.single('file'),
  uploadVoiceRecording
)

module.exports = router