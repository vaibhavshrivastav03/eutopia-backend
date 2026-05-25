const Joi = require('joi')

const fireSchema =
  Joi.object({

    user_id:
      Joi.string()
        .required(),

    occupancy:
      Joi.number()
        .required(),

    address:
      Joi.string()
        .required()

  })

const ambulanceSchema =
  Joi.object({

    user_id:
      Joi.string()
        .required()

  })

module.exports = {
  fireSchema,
  ambulanceSchema
}