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

const updateOnboardingProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      full_name,
      profile_photo,
      allergies,
      medical_notes,
      blood_group,
      age,
    } = req.body;

    const updateData = {};

    if (full_name !== undefined)
      updateData.full_name = full_name;

    if (profile_photo !== undefined)
      updateData.profile_photo = profile_photo;

    if (allergies !== undefined)
      updateData.allergies = allergies;

    if (medical_notes !== undefined)
      updateData.medical_notes = medical_notes;

    if (blood_group !== undefined)
      updateData.blood_group = blood_group;

    if (age !== undefined)
      updateData.age = age;

    const { data, error } = await supabase
      .from("users")
      .update(updateData)
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    return res.json({
      success: true,
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
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