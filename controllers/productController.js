import httpStatus from '../helpers/httpStatus.js'
import prisma from '../database/prisma.js'
import addSoftDelete from '../middlewares/softDelete.js'

export const productController = () => {
  const createProduct = async (req, res, next) => {
    try {
      const { name, category, price, stock } = req.body
      const product = await prisma.products.create({
        data: {
          name,
          category,
          price,
          stock
        }
      })
      return res.status(httpStatus.CREATED).json(product)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getProducts = async (_, res, next) => {
    try {
      const products = await prisma.products.findMany({
        where: {
          deletedAt: null
        }
      })
      return res.status(httpStatus.OK).json(products)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getProductById = async (req, res, next) => {
    try {
      const { id } = req.params
      const product = await prisma.products.findUnique({
        where: {
          id: Number(id)
        }
      })
      return res.status(httpStatus.OK).json(product)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const updateProduct = async (req, res, next) => {
    try {
      const { id } = req.params
      const { name, price, category, stock } = req.body

      const updatedProduct = await prisma.products.update({
        where: {
          id: Number(id)
        },
        data: {
          name,
          price,
          category,
          stock
        }
      })
      return res.status(httpStatus.OK).json(updatedProduct)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const deleteProduct = async (req, res, next) => {
    try {
      const { id } = req.params

      prisma.$use(addSoftDelete)

      await prisma.products.delete({
        where: {
          id: Number(id)
        }
      })
      return res.status(httpStatus.OK).json({ success: true, message: 'Product deleted successfully' })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }
  return {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
  }
}
