import Joi from "joi"

export const productSchema = Joi.object({
  name: Joi.string().min(4).required(),
  category: Joi.string().min(5).required(),
  stock: Joi.number().min(0).required(),
  price: Joi.number().min(0).required()
})

export const productParamsSchema = Joi.object({
  id: Joi.string().pattern(/^[0-9]+$/, "numbers").required()
})
