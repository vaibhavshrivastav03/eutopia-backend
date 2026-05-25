const supabase = require('../config/supabase')

const {
  sendAmbulanceSMS
} = require('../services/smsService')

const triggerAmbulanceAlert =
  async (req, res) => {

    try {

      const { user_id } = req.body

      // GET USER DETAILS
      const {
        data: userData,
        error: userError
      } = await supabase
        .from('users')
        .select('*')
        .eq('id', user_id)
        .single()

      if (userError) {

        return res.status(400).json({
          success: false,
          error: userError.message
        })

      }

      // CREATE AMBULANCE ALERT
      const {
        data: ambulanceData,
        error: ambulanceError
      } = await supabase
        .from('ambulance_alerts')
        .insert([
          {
            user_id,
            blood_group:
              userData.blood_group,
            allergies:
              userData.allergies,
            eta: '5 mins',
            hospital_status:
              'HOSPITAL NOTIFIED'
          }
        ])
        .select()

      if (ambulanceError) {

        return res.status(400).json({
          success: false,
          error:
            ambulanceError.message
        })

      }

      // EMERGENCY LOG
      await supabase
        .from('emergency_logs')
        .insert([
          {
            user_id,
            emergency_type:
              'AMBULANCE',
            status: 'ACTIVE',
            notes:
              'Ambulance emergency triggered'
          }
        ])

      // SEND SMS
      await sendAmbulanceSMS(
        user_id
      )

      // REALTIME SOCKET EVENT
      const io = req.app.get('io')

      io.emit(
        'ambulance_alert',
        ambulanceData
      )

      res.status(201).json({
        success: true,
        message:
          'Ambulance dispatched',
        data: ambulanceData
      })

    } catch (err) {

      res.status(500).json({
        success: false,
        error: err.message
      })

    }

  }

const getAllAmbulanceAlerts =
  async (req, res) => {

    try {

      const {
        data,
        error
      } = await supabase
        .from('ambulance_alerts')
        .select(`
          *,
          users (
            *
          )
        `)
        .order('created_at', {
          ascending: false
        })

      if (error) {

        return res.status(400).json({
          success: false,
          error: error.message
        })

      }

      res.json({
        success: true,
        data
      })

    } catch (err) {

      res.status(500).json({
        success: false,
        error: err.message
      })

    }

  }

module.exports = {
  triggerAmbulanceAlert,
  getAllAmbulanceAlerts
}