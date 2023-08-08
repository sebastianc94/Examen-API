import { categoryParamsSchema, categorySchema } from "../validations/categorySchema.js"
import { customerParamsSchema, customerSchema } from "../validations/customerSchema.js"
import { orderParamsSchema, orderSchema } from "../validations/orderSchema.js"
import { productParamsSchema, productSchema } from "../validations/productSchema.js"

export const productValidation = (req, _res, next) => {
  const data = req.body
  const { error } = productSchema.validate(data)
  error ? next(error) : next()
}

export const productParamsValidation = (req, _res, next) => {
  const params = req.params
  const { error } = productParamsSchema.validate(params)
  error ? next(error) : next()
}

export const orderValidation = (req, _res, next) => {
  const data = req.body
  const { error } = orderSchema.validate(data)
  error ? next(error) : next()
}

export const orderParamsValidation = (req, _res, next) => {
  const params = req.params
  const { error } = orderParamsSchema.validate(params)
  error ? next(error) : next()
}

export const customerValidation = (req, _res, next) => {
  const data = req.body
  const { error } = customerSchema.validate(data)
  error ? next(error) : next()
}

export const customerParamsValidation = (req, _res, next) => {
  const params = req.params
  const { error } = customerParamsSchema.validate(params)
  error ? next(error) : next()
}

export const categoryValidation = (req, _res, next) => {
  const data = req.body
  const { error } = categorySchema.validate(data)
  error ? next(error) : next()
}

export const categoryParamsValidation = (req, _res, next) => {
  const params = req.params
  const { error } = categoryParamsSchema.validate(params)
  error ? next(error) : next()
}
