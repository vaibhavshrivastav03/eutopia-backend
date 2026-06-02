const axios = require('axios')
const supabase = require('../config/supabase')

const sendSMS = async (
  phone,
  message
) => {

  try {

    const response =
      await axios.post(
        'https://my.kudisms.net/api/corporate',
        {
          token:
            process.env.KUDI_SMS_TOKEN,

          senderID:
            process.env.KUDI_SMS_SENDER_ID,

          recipients:
            phone,

          message
        }
      )

    console.log(
      'SMS SUCCESS:',
      response.data
    )

    return true

  } catch (err) {

    console.log(
      'SMS ERROR:',
      err.response?.data ||
      err.message
    )

    return false

  }

}

// TEST SMS
const sendTestSMS =
  async () => {

    return await sendSMS(
      process.env.TEST_PHONE,
      'EUTOPIA TEST ALERT - SMS integration successful.'
    )

  }

const sendFireSMS =
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

    const message = `
EUTOPIA FIRE ALERT

User: ${user.full_name}

Location:
${user.address}

Occupancy:
${user.occupancy_count}

Please contact emergency services immediately.
`

    for (const contact of contacts || []) {

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

    const message = `
EUTOPIA AMBULANCE ALERT

User: ${user.full_name}

Blood Group:
${user.blood_group}

Allergies:
${user.allergies}

Medical assistance requested.
`

    for (const contact of contacts || []) {

      await sendSMS(
        contact.contact_phone,
        message
      )

    }

  }

module.exports = {
  sendSMS,
  sendTestSMS,
  sendFireSMS,
  sendAmbulanceSMS
}