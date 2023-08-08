import httpStatus from '../helpers/httpStatus.js'
import prisma from '../database/prisma.js'
import addSoftDelete from '../middlewares/softDelete.js'

export const orderController = () => {
  const createOrder = async (req, res, next) => {
    try {
      const { ammount, shipping_address, order_address, order_status } = req.body
      const order = await prisma.orders.create({
        data: {
          ammount,
          shipping_address,
          order_address,
          order_status
        }
      })
      return res.status(httpStatus.CREATED).json(order)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getOrders = async (_, res, next) => {
    try {
      const orders = await prisma.orders.findMany({
        where: {
          deletedAt: null
        }
      })
      return res.status(httpStatus.OK).json(orders)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getOrderById = async (req, res, next) => {
    try {
      const { id } = req.params
      const order = await prisma.orders.findUnique({
        where: {
          id: Number(id)
        }
      })
      return res.status(httpStatus.OK).json(order)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const updateOrder = async (req, res, next) => {
    try {
      const { id } = req.params
      const { ammount, shipping_address, order_address, order_status } = req.body

      const updatedOrder = await prisma.orders.update({
        where: {
          id: Number(id)
        },
        data: {
          ammount,
          shipping_address,
          order_address,
          order_status
        }
      })
      return res.status(httpStatus.OK).json(updatedOrder)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const deleteOrder = async (req, res, next) => {
    try {
      const { id } = req.params

      prisma.$use(addSoftDelete)

      await prisma.orders.delete({
        where: {
          id: Number(id)
        }
      })
      return res.status(httpStatus.OK).json({ success: true, message: 'Order deleted successfully' })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }
  return {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
  }
}
