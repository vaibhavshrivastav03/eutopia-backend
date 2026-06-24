const supabase = require('../config/supabase')

const assignBracelet = async (req, res) => {

  try {

    const {
      bracelet_uid,
      current_user_id
    } = req.body

    const { data, error } = await supabase
      .from('bracelet_assignments')
      .insert([
        {
          bracelet_uid,
          current_user_id
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

const scanBracelet = async (req, res) => {

  try {

    const { uid } = req.params

    const { data, error } = await supabase
      .from('bracelet_assignments')
      .select(`
        *,
        users (
          *
        )
      `)
      .eq('bracelet_uid', uid)
      .single()

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

const switchBraceletUser = async (req, res) => {

  try {

    const {
      bracelet_uid,
      new_user_id
    } = req.body

    const { data, error } = await supabase
      .from('bracelet_assignments')
      .update({
        current_user_id: new_user_id
      })
      .eq('bracelet_uid', bracelet_uid)
      .select()

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

const getUserBracelet = async (req,res) => {
  try {
    const { userId } = req.params

    const { data, error } =
      await supabase
        .from('bracelet_assignments')
        .select('*')
        .eq('current_user_id', userId)
        .eq('is_active', true)
        .single()

    if (error) {
      return res.status(404).json({
        success: false,
        message: 'Bracelet not found'
      })
    }

    return res.json({
      success: true,
      bracelet_uid:
        data.bracelet_uid
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

const assignUserBracelet = async (
  req,
  res
) => {

  try {

    const userId =
      req.user.id;

    const {
      bracelet_uid
    } = req.body;

    const { data, error } =
      await supabase
        .from(
          "bracelet_assignments"
        )
        .insert([
          {
            bracelet_uid,
            current_user_id:
              userId,
            is_active: true
          }
        ])
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
  assignBracelet,
  scanBracelet,
  switchBraceletUser,
  getUserBracelet,
  assignUserBracelet
}