const supabase = require('../config/supabase')

const uploadProfilePhoto = async (req, res) => {

  try {

    const file = req.file

    if (!file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      })
    }

    const fileName = `profile-${Date.now()}-${file.originalname}`

    const { data, error } = await supabase.storage
      .from('profile-photos')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype
      })

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message
      })
    }

    const {
      data: publicUrlData
    } = supabase.storage
      .from('profile-photos')
      .getPublicUrl(fileName)

    res.json({
      success: true,
      url: publicUrlData.publicUrl
    })

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message
    })

  }

}

const uploadVoiceRecording = async (req, res) => {

  try {

    const file = req.file

    if (!file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      })
    }

    const fileName = `voice-${Date.now()}-${file.originalname}`

    const { data, error } = await supabase.storage
      .from('voice-recordings')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype
      })

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message
      })
    }

    const {
      data: publicUrlData
    } = supabase.storage
      .from('voice-recordings')
      .getPublicUrl(fileName)

    res.json({
      success: true,
      url: publicUrlData.publicUrl
    })

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message
    })

  }

}

module.exports = {
  uploadProfilePhoto,
  uploadVoiceRecording
}