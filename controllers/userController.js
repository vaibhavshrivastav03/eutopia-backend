const supabase = require('../config/supabase')

const createUser = async (req, res) => {

  try {

    const {
      full_name,
      age,
      phone,
      blood_group,
      allergies,
      medical_notes,
      address,
      occupancy_count,
      preferred_language
    } = req.body

    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          full_name,
          age,
          phone,
          blood_group,
          allergies,
          medical_notes,
          address,
          occupancy_count,
          preferred_language:
            preferred_language ||
            'English'
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

module.exports = {
  createUser
}