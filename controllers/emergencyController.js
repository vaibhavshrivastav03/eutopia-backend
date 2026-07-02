const supabase = require("../config/supabase");

const {
  sendMedicalEmergencySMS,
} = require("../services/smsService");

const sendMedicalAlert = async (req, res) => {
  try {
    const { user_id } = req.body;

    await sendMedicalEmergencySMS(user_id);

    res.json({
      success: true,
      message: "Emergency SMS sent successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  sendMedicalAlert,
};