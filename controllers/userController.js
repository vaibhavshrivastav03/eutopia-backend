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

const updateOnboardingProfile =
  async (req, res) => {

  try {

    const userId = req.user.id;

    const {
      full_name,
      profile_photo,
      allergies,
      medical_notes,
      blood_group,
      age
    } = req.body;

    const { data, error } =
      await supabase
        .from('users')
        .update({
          full_name,
          profile_photo,
          allergies,
          medical_notes,
          blood_group,
          age
        })
        .eq('id', userId)
        .select()
        .single();

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }

    return res.json({
      success: true,
      data
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      error: err.message
    });

  }

};

const saveEmergencyContacts =
  async (req, res) => {

  try {

    const userId =
      req.user.id;

    const { contacts } =
      req.body;

    await supabase
      .from('emergency_contacts')
      .delete()
      .eq('user_id', userId);

    const rows =
      contacts.map(contact => ({
        user_id: userId,
        contact_name:
          contact.name,
        contact_phone:
          contact.phone,
        relationship:
          contact.relationship
      }));

    const { data, error } =
      await supabase
        .from('emergency_contacts')
        .insert(rows)
        .select();

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }

    return res.json({
      success: true,
      data
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      error: err.message
    });

  }

};

module.exports = {
  createUser,
  updateOnboardingProfile,
  saveEmergencyContacts
}