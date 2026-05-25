const supabase = require('../config/supabase')

const scanBraceletMedical =
  async (req, res) => {

    try {

      const { uid } = req.params

      // GET BRACELET + USER
      const {
        data,
        error
      } = await supabase
        .from('bracelet_assignments')
        .select(`
          *,
          users (
            id,
            full_name,
            age,
            blood_group,
            allergies,
            address,
            occupancy_count,
            profile_photo
          )
        `)
        .eq('bracelet_uid', uid)
        .single()

      if (error) {
        return res.status(400).json({
          success: false,
          error: error.message
        })
      }

      // GET CONTACTS
      const {
        data: contacts
      } = await supabase
        .from('emergency_contacts')
        .select('*')
        .eq(
          'user_id',
          data.current_user_id
        )

      res.json({
        success: true,
        patient: data.users,
        emergency_contacts: contacts
      })

    } catch (err) {

      res.status(500).json({
        success: false,
        error: err.message
      })

    }

  }

const verifyMedicalPasscode =
  async (req, res) => {

    try {

      const {
        user_id,
        passcode
      } = req.body

      const {
        data: user,
        error
      } = await supabase
        .from('users')
        .select('*')
        .eq('id', user_id)
        .single()

      if (error || !user) {
        return res.status(400).json({
          success: false,
          error: 'User not found'
        })
      }

      if (
        user.medical_passcode !==
        passcode
      ) {
        return res.status(401).json({
          success: false,
          error: 'Invalid passcode'
        })
      }

      res.json({
        success: true,
        medical_record: user
      })

    } catch (err) {

      res.status(500).json({
        success: false,
        error: err.message
      })

    }

  }

module.exports = {
  scanBraceletMedical,
  verifyMedicalPasscode
}