const supabase =
  require('../config/supabase')

const createMedicalRecord =
  async (req, res) => {

    try {

      const {
        user_id,
        record_title,
        diagnosis,
        medications,
        notes
      } = req.body

      const {
        data,
        error
      } = await supabase
        .from('medical_records')
        .insert([
          {
            user_id,
            record_title,
            diagnosis,
            medications,
            notes
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

const getMedicalRecords =
  async (req, res) => {

    try {

      const { userId } =
        req.params

      const {
        data,
        error
      } = await supabase
        .from('medical_records')
        .select('*')
        .eq('user_id', userId)
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
  createMedicalRecord,
  getMedicalRecords
}