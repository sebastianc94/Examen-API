import httpStatus from '../helpers/httpStatus.js'
import prisma from '../database/prisma.js'
import addSoftDelete from '../middlewares/softDelete.js'
import bcrypt from "bcrypt"

export const customerController = () => {
  const createCustomer = async (req, res, next) => {
    try {
      const { email, password, full_name, billing_address, country, phone } = req.body
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      const customer = await prisma.customers.create({
        data: {
          email,
          password: hashedPassword,
          full_name,
          billing_address,
          country,
          phone
        }
      })
      return res.status(httpStatus.CREATED).json(customer)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getCustomers = async (_, res, next) => {
    try {
      const customers = await prisma.customers.findMany({
        where: {
          deletedAt: null
        }
      })
      return res.status(httpStatus.OK).json(customers)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getCustomerById = async (req, res, next) => {
    try {
      const { id } = req.params
      const customers = await prisma.customers.findUnique({
        where: {
          id: Number(id)
        }
      })
      return res.status(httpStatus.OK).json(customers)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const updateCustomer = async (req, res, next) => {
    try {
      const { id } = req.params
      const { email, password, full_name, billing_address, country, phone } = req.body
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      const updatedProduct = await prisma.customers.update({
        where: {
          id: Number(id)
        },
        data: {
          email,
          password: hashedPassword,
          full_name,
          billing_address,
          country,
          phone
        }

      })
      return res.status(httpStatus.OK).json(updatedProduct)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const deleteCustomer = async (req, res, next) => {
    try {
      const { id } = req.params

      prisma.$use(addSoftDelete)

      await prisma.customers.delete({
        where: {
          id: Number(id)
        }
      })
      return res.status(httpStatus.OK).json({ success: true, message: 'Customer deleted successfully' })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }
  return {
    getCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
  }
}
