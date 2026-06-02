require('dotenv').config()

const bcrypt = require('bcryptjs')
const supabase = require('../config/supabase')

const EMERGENCY_CONTACTS = [
  {
    name: 'Father',
    phone: '8050598820',
    relationship: 'Parent'
  },
  {
    name: 'Mother',
    phone: '7076010331',
    relationship: 'Parent'
  },
  {
    name: 'Hospital',
    phone: '8164372815',
    relationship: 'Hospital'
  },
  {
    name: 'Fire Department',
    phone: '8158615579',
    relationship: 'Emergency'
  }
]

async function seed() {

  try {

    console.log('Cleaning old data...')

    await supabase.from('voice_triggers').delete().neq('id', '')
    await supabase.from('emergency_logs').delete().neq('id', '')
    await supabase.from('ambulance_alerts').delete().neq('id', '')
    await supabase.from('fire_alerts').delete().neq('id', '')
    await supabase.from('hospital_records').delete().neq('id', '')
    await supabase.from('medical_records').delete().neq('id', '')
    await supabase.from('bracelet_assignments').delete().neq('id', '')
    await supabase.from('emergency_contacts').delete().neq('id', '')

    // KEEP ADMIN
    await supabase
      .from('users')
      .delete()
      .eq('role', 'user')

    console.log('Creating demo user...')

    const hashedPassword =
      await bcrypt.hash(
        '123456',
        10
      )

    const {
      data: userData,
      error: userError
    } = await supabase
      .from('users')
      .insert([
        {
          full_name:
            'Christianah demo user',

          age:
            29,

          phone:
            '8164372815',

          blood_group:
            'O+',

          allergies:
            'None',

          medical_notes:
            'Demo User',

          address:
            'Indore, India',

          occupancy_count:
            4,

          role:
            'user',

          email:
            'demo@eutopia.com',

          password:
            hashedPassword,

          medical_passcode:
            '1234',

          preferred_language:
            'English',

          protection_active:
            true
        }
      ])
      .select()

    if (userError) {

      console.log(userError)
      return

    }

    const userId =
      userData[0].id

    console.log(
      'Creating emergency contacts...'
    )

    const contacts =
      EMERGENCY_CONTACTS.map(
        contact => ({
          user_id:
            userId,

          contact_name:
            contact.name,

          contact_phone:
            contact.phone,

          relationship:
            contact.relationship
        })
      )

    await supabase
      .from(
        'emergency_contacts'
      )
      .insert(
        contacts
      )

    console.log(
      'Assigning bracelet...'
    )

    await supabase
      .from(
        'bracelet_assignments'
      )
      .insert([
        {
          bracelet_uid:
            'EUTOPIA001',

          current_user_id:
            userId,

          is_active:
            true
        }
      ])

    console.log(
      'Creating medical record...'
    )

    await supabase
      .from(
        'medical_records'
      )
      .insert([
        {
          user_id:
            userId,

          record_title:
            'Blood Test',

          diagnosis:
            'Healthy',

          medications:
            'Vitamin D',

          notes:
            'Demo medical record'
        }
      ])

    console.log(
      'Creating hospital record...'
    )

    await supabase
      .from(
        'hospital_records'
      )
      .insert([
        {
          user_id:
            userId,

          hospital_name:
            'Apollo Hospital',

          doctor_name:
            'Dr Sharma',

          visit_date:
            '2026-01-10',

          diagnosis:
            'Routine Checkup',

          treatment:
            'Observation'
        }
      ])

    console.log('================')
    console.log('SEED COMPLETED')
    console.log('================')

    console.log(
      'Email: demo@eutopia.com'
    )

    console.log(
      'Password: 123456'
    )

    console.log(
      'Bracelet: EUTOPIA001'
    )

  } catch (err) {

    console.log(err)

  }

}

seed()