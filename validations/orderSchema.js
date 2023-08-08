import Joi from "joi"

export const orderSchema = Joi.object({
  ammount: Joi.number().min(0).required(),
  order_address: Joi.string().min(6).required(),
  shipping_address: Joi.string().min(5).required()
})

export const orderParamsSchema = Joi.object({
  id: Joi.string().pattern(/^[0-9]+$/, "numbers").required()
})
