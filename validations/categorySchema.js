import Joi from "joi"

export const categorySchema = Joi.object({
  name: Joi.string().min(5).required(),
  descriptions: Joi.string().min(4).required()
})

export const categoryParamsSchema = Joi.object({
  id: Joi.string().pattern(/^[0-9]+$/, "numbers").required()
})
