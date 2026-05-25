const supabase = require('../config/supabase')

const createVoiceTrigger =
  async (req, res) => {

    try {

      const {
        user_id,
        transcript,
        confidence
      } = req.body

      // DETECT EMERGENCY TYPE
      let emergency_type =
        'UNKNOWN'

      const lowerText =
        transcript.toLowerCase()

      if (
        lowerText.includes('fire')
      ) {

        emergency_type = 'FIRE'

      }

      if (
        lowerText.includes(
          'ambulance'
        )
      ) {

        emergency_type =
          'AMBULANCE'

      }

      // CREATE VOICE TRIGGER
      const {
        data,
        error
      } = await supabase
        .from('voice_triggers')
        .insert([
          {
            user_id,
            transcript,
            confidence,
            emergency_type,
            approved: false
          }
        ])
        .select()

      if (error) {

        return res.status(400).json({
          success: false,
          error: error.message
        })

      }

      // REALTIME SOCKET EVENT
      const io = req.app.get('io')

      io.emit(
        'voice_trigger',
        data
      )

      res.status(201).json({
        success: true,
        message:
          'Voice trigger created',
        data
      })

    } catch (err) {

      res.status(500).json({
        success: false,
        error: err.message
      })

    }

  }

const approveVoiceTrigger =
  async (req, res) => {

    try {

      const { id } = req.params

      const {
        data,
        error
      } = await supabase
        .from('voice_triggers')
        .update({
          approved: true
        })
        .eq('id', id)
        .select()

      if (error) {

        return res.status(400).json({
          success: false,
          error: error.message
        })

      }

      // REALTIME APPROVAL EVENT
      const io = req.app.get('io')

      io.emit(
        'voice_approved',
        data
      )

      res.json({
        success: true,
        message:
          'Voice trigger approved',
        data
      })

    } catch (err) {

      res.status(500).json({
        success: false,
        error: err.message
      })

    }

  }

const getAllVoiceTriggers =
  async (req, res) => {

    try {

      const {
        data,
        error
      } = await supabase
        .from('voice_triggers')
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
  createVoiceTrigger,
  approveVoiceTrigger,
  getAllVoiceTriggers
}