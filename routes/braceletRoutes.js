const express = require('express')

const router = express.Router()

const {
  assignBracelet,
  scanBracelet,
  switchBraceletUser,
  getUserBracelet,
  assignUserBracelet
} = require('../controllers/braceletController')

const authMiddleware =
  require('../middleware/authMiddleware')

const roleMiddleware =
  require('../middleware/roleMiddleware')


router.get(
  '/user/:userId',
  authMiddleware,
  getUserBracelet
) 

// ADMIN ONLY
router.post(
  '/assign',
  authMiddleware,
  roleMiddleware('admin', 'user'),
  assignBracelet
)

// PUBLIC ACCESS
router.get(
  '/scan/:uid',
  scanBracelet
)

router.post(
  '/assign-user-bracelet',
  authMiddleware,
  assignUserBracelet
);

// ADMIN ONLY
router.put(
  '/switch-user',
  authMiddleware,
  roleMiddleware('admin', 'user'),
  switchBraceletUser
)

module.exports = router