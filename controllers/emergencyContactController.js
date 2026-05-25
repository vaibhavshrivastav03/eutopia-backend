const supabase = require('../config/supabase')

const createEmergencyContact = async (req, res) => {

  try {

    const {
      user_id,
      contact_name,
      contact_phone,
      relationship
    } = req.body

    const { data, error } = await supabase
      .from('emergency_contacts')
      .insert([
        {
          user_id,
          contact_name,
          contact_phone,
          relationship
        }
      ])
      .select()

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message
      })
    }

    res.status(201).json({
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

const getUserEmergencyContacts = async (req, res) => {

  try {

    const { userId } = req.params

    const { data, error } = await supabase
      .from('emergency_contacts')
      .select('*')
      .eq('user_id', userId)

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
  createEmergencyContact,
  getUserEmergencyContacts
}