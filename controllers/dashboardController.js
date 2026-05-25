const supabase = require('../config/supabase')

const getDashboardOverview =
  async (req, res) => {

    try {

      // FIRE ALERTS
      const {
        data: fireAlerts
      } = await supabase
        .from('fire_alerts')
        .select(`
          *,
          users (
            *
          )
        `)
        .order('created_at', {
          ascending: false
        })

      // AMBULANCE ALERTS
      const {
        data: ambulanceAlerts
      } = await supabase
        .from('ambulance_alerts')
        .select(`
          *,
          users (
            *
          )
        `)
        .order('created_at', {
          ascending: false
        })

      // EMERGENCY LOGS
      const {
        data: emergencyLogs
      } = await supabase
        .from('emergency_logs')
        .select(`
          *,
          users (
            *
          )
        `)
        .order('created_at', {
          ascending: false
        })

      res.json({
        success: true,
        fireAlerts,
        ambulanceAlerts,
        emergencyLogs
      })

    } catch (err) {

      res.status(500).json({
        success: false,
        error: err.message
      })

    }

  }

const updateEmergencyStatus =
  async (req, res) => {

    try {

      const { id } = req.params

      const {
        status
      } = req.body

      const { data, error } =
        await supabase
          .from('emergency_logs')
          .update({
            status
          })
          .eq('id', id)
          .select()

      if (error) {
        return res.status(400).json({
          success: false,
          error: error.message
        })
      }

      res.json({
        success: true,
        message:
          'Emergency status updated',
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
  getDashboardOverview,
  updateEmergencyStatus
}