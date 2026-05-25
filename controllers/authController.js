const supabase = require('../config/supabase')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {

  try {

    const {
      full_name,
      email,
      password
    } = req.body

    // CHECK EXISTING USER
    const { data: existingUser } =
      await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Email already exists'
      })
    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(password, 10)

    // CREATE USER
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          full_name,
          email,
          password: hashedPassword
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
      message: 'User registered',
      data
    })

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message
    })

  }

}

const loginUser = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body

    // FIND USER
    const { data: user, error } =
      await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()

    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email'
      })
    }

    // CHECK PASSWORD
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      )

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: 'Invalid password'
      })
    }

    // GENERATE TOKEN
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d'
      }
    )

    res.json({
      success: true,
      token,
      user
    })

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message
    })

  }

}

module.exports = {
  registerUser,
  loginUser
}