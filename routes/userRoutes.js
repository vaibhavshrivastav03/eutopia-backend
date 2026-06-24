const express = require('express')

const router = express.Router()

const {
  createUser,
  updateOnboardingProfile,
  saveEmergencyContacts
} = require('../controllers/userController');

const authMiddleware =
  require('../middleware/authMiddleware');

const roleMiddleware =
  require('../middleware/roleMiddleware');

router.post(
  '/create',
  authMiddleware,
  roleMiddleware('admin'),
  createUser
);

router.put(
  '/onboarding-profile',
  authMiddleware,
  updateOnboardingProfile
);

router.post(
  '/emergency-contacts',
  authMiddleware,
  saveEmergencyContacts
);

module.exports = router