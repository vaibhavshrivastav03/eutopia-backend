const supabase =
  require('../config/supabase')

const identifyPatient =
  async (req, res) => {

    try {

      const {
        user_id,
        hospital_name,
        identified_by,
        notes
      } = req.body

      const {
        data,
        error
      } = await supabase
        .from(
          'hospital_identifications'
        )
        .insert([
          {
            user_id,
            hospital_name,
            identified_by,
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

      // REALTIME EVENT
      const io =
        req.app.get('io')

      io.emit(
        'hospital_identification',
        data
      )

      res.status(201).json({
        success: true,
        message:
          'Patient identified',
        data
      })

    } catch (err) {

      res.status(500).json({
        success: false,
        error: err.message
      })

    }

  }

const getAllIdentifications =
  async (req, res) => {

    try {

      const {
        data,
        error
      } = await supabase
        .from(
          'hospital_identifications'
        )
        .select(`
          *,
          users(*)
        `)
        .order(
          'created_at',
          {
            ascending:false
          }
        )

      if (error) {

        return res.status(400).json({
          success:false,
          error:error.message
        })

      }

      res.json({
        success:true,
        data
      })

    } catch(err){

      res.status(500).json({
        success:false,
        error:err.message
      })

    }

  }

module.exports = {
  identifyPatient,
  getAllIdentifications
}