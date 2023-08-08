import { Router } from 'express'
import { orderController } from '../controllers/orderController.js'
import { orderParamsValidation, orderValidation } from '../middlewares/validations.js'
import { auth } from '../middlewares/auth.js'

export const orderRoutes = () => {
  const orderRouter = Router()
  const { getOrders, getOrderById, createOrder, updateOrder, deleteOrder } = orderController()

  orderRouter.route('/orders')
    .get(getOrders)
    .post(auth, orderValidation, createOrder)

  orderRouter.route('/orders/:id')
    .get(getOrderById)
    .put(auth, orderParamsValidation, orderValidation, updateOrder)
    .delete(auth, deleteOrder)

  return orderRouter
}
