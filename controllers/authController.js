const supabase = require('../config/supabase')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
  try {
    const {
      full_name,
      email,
      phone,
      age,
      gender,
      address,
      password,
      role = "user",
    } = req.body;

    // CHECK EXISTING USER
    const {
      data: existingUser,
      error: existingUserError,
    } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "Email already exists",
      });
    }

    if (existingUserError) {
      return res.status(400).json({
        success: false,
        error: existingUserError.message,
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE USER
    const { data: user, error } = await supabase
      .from("users")
      .insert([
        {
          full_name,
          email,
          phone,
          age: age ? Number(age) : null,
          gender,
          address,
          role,
          password: hashedPassword,
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    // GENERATE JWT TOKEN
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

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