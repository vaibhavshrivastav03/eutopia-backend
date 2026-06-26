const Joi = require('joi')

const registerSchema =
  Joi.object({

    full_name:
      Joi.string()
        .min(3)
        .required(),

    email:
      Joi.string()
        .email()
        .required(),

    phone:
      Joi.string()
        .required(),

    age:
      Joi.number()
        .integer()
        .min(0)
        .max(120)
        .required(),

    blood_group:
      Joi.string()
        .valid(
          "A+",
          "A-",
          "B+",
          "B-",
          "AB+",
          "AB-",
          "O+",
          "O-"
        )
        .required(),

    address:
      Joi.string()
        .min(3)
        .required(),

    password:
      Joi.string()
        .min(6)
        .required(),

    role:
      Joi.string()
        .valid(
          'user',
          'admin',
          'hospital',
          'firefighter'
        )
        .required()

  })

const loginSchema =
  Joi.object({

    email:
      Joi.string()
        .email()
        .required(),

    password:
      Joi.string()
        .required()

  })

module.exports = {
  registerSchema,
  loginSchema
}