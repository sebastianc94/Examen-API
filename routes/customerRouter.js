import { Router } from 'express'
import { customerController } from '../controllers/customerController.js'
import { customerParamsValidation, customerValidation } from '../middlewares/validations.js'
import { auth } from '../middlewares/auth.js'

export const customerRoutes = () => {
  const customerRouter = Router()
  const { getCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer } = customerController()

  customerRouter.route('/customers')
    .get(getCustomers)
    .post(auth, customerValidation, createCustomer)

  customerRouter.route('/customers/:id')
    .get(getCustomerById)
    .put(auth, customerParamsValidation, customerValidation, updateCustomer)
    .delete(auth, deleteCustomer)

  return customerRouter
}
