const supabase = require('../config/supabase')
const {sendFireSMS} = require('../services/smsService')

const triggerFireAlert = async (req, res) => {

  try {

    const {
      user_id,
      occupancy,
      address
    } = req.body

    // FIRE ALERT ENTRY
    const { data: fireData, error: fireError } =
      await supabase
        .from('fire_alerts')
        .insert([
          {
            user_id,
            occupancy,
            address,
            dispatch_status: 'DISPATCHED'
          }
        ])
        .select()

    if (fireError) {
      return res.status(400).json({
        success: false,
        error: fireError.message
      })
    }

    // EMERGENCY LOG ENTRY
    await supabase
      .from('emergency_logs')
      .insert([
        {
          user_id,
          emergency_type: 'FIRE',
          status: 'ACTIVE',
          notes: 'Fire emergency triggered'
        }
      ])

    await sendFireSMS(user_id) 
    
    res.status(201).json({
      success: true,
      message: 'Fire emergency triggered',
      data: fireData
    })

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message
    })

  }

}

const getAllFireAlerts = async (req, res) => {

  try {

    const { data, error } = await supabase
      .from('fire_alerts')
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
  triggerFireAlert,
  getAllFireAlerts
}