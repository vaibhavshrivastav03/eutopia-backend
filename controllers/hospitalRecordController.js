const supabase =
  require('../config/supabase')

const createHospitalRecord =
  async (req, res) => {

    try {

      const {
        user_id,
        hospital_name,
        doctor_name,
        visit_date,
        diagnosis,
        treatment
      } = req.body

      const {
        data,
        error
      } = await supabase
        .from('hospital_records')
        .insert([
          {
            user_id,
            hospital_name,
            doctor_name,
            visit_date,
            diagnosis,
            treatment
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

const getHospitalRecords =
  async (req, res) => {

    try {

      const {
        userId
      } = req.params

      const {
        data,
        error
      } = await supabase
        .from('hospital_records')
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

  const getAllHospitalRecords =
  async (req, res) => {

    try {

      const {
        data,
        error
      } = await supabase
        .from('hospital_records')
        .select('*')
        .order('hospital_name', {
          ascending: true
        })

      if (error) {

        return res.status(400).json({
          success: false,
          error: error.message
        })

      }

      return res.json({
        success: true,
        data
      })

    } catch (err) {

      return res.status(500).json({
        success: false,
        error: err.message
      })

    }

  }

module.exports = {
  createHospitalRecord,
  getHospitalRecords,
  getAllHospitalRecords
}