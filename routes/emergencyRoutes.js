const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  sendMedicalAlert,
} = require("../controllers/emergencyController");

router.post(
  "/send-medical-alert",
  authMiddleware,
  sendMedicalAlert
);

module.exports = router;