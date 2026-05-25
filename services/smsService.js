const supabase = require('../config/supabase')

const sendSMS = async (
  phone,
  message
) => {

  try {

    // DEMO MODE
    console.log('SMS SENT')
    console.log(phone)
    console.log(message)

    // REAL KUDI SMS API LATER

    return true

  } catch (err) {

    console.log(err)

    return false

  }

}

const sendFireSMS = async (
  user_id
) => {

  const {
    data: user
  } = await supabase
    .from('users')
    .select('*')
    .eq('id', user_id)
    .single()

  const {
    data: contacts
  } = await supabase
    .from('emergency_contacts')
    .select('*')
    .eq('user_id', user_id)

  for (const contact of contacts) {

    const message = `
EUTOPIA ALERT:
Fire emergency detected for ${user.full_name}

Location:
${user.address}

Occupancy:
${user.occupancy_count}
    `

    await sendSMS(
      contact.contact_phone,
      message
    )

  }

}

const sendAmbulanceSMS =
  async (user_id) => {

    const {
      data: user
    } = await supabase
      .from('users')
      .select('*')
      .eq('id', user_id)
      .single()

    const {
      data: contacts
    } = await supabase
      .from('emergency_contacts')
      .select('*')
      .eq('user_id', user_id)

    for (const contact of contacts) {

      const message = `
EUTOPIA ALERT:
Ambulance requested for ${user.full_name}

Blood Group:
${user.blood_group}

Allergies:
${user.allergies}

ETA:
5 mins
      `

      await sendSMS(
        contact.contact_phone,
        message
      )

    }

  }

module.exports = {
  sendFireSMS,
  sendAmbulanceSMS
}