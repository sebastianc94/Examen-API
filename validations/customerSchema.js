import Joi from "joi"

export const customerSchema = Joi.object({
  email: Joi.string().min(8).required(),
  password: Joi.number().min(6).required(),
  full_name: Joi.string().min(5).required(),
  billing_address: Joi.string().min(8).required(),
  country: Joi.string().min(4).required(),
  phone: Joi.number().min(0).required()
})

export const customerParamsSchema = Joi.object({
  id: Joi.string().pattern(/^[0-9]+$/, "numbers").required()
})
