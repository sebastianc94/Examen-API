import httpStatus from '../helpers/httpStatus.js'
import prisma from '../database/prisma.js'
import addSoftDelete from '../middlewares/softDelete.js'

export const categoryController = () => {
  const createCategory = async (req, res, next) => {
    try {
      const { name, description } =
        req.body
      const category = await prisma.categories.create({
        data: {
          name,
          description
        }
      })
      return res.status(httpStatus.CREATED).json(category)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getCategories = async (_, res, next) => {
    try {
      const categories = await prisma.categories.findMany({
        where: {
          deletedAt: null
        }
      })
      return res.status(httpStatus.OK).json(categories)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getCategoryById = async (req, res, next) => {
    try {
      const { id } = req.params
      const categories = await prisma.categories.findUnique({
        where: {
          id: Number(id)
        }
      })
      return res.status(httpStatus.OK).json(categories)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const updateCategory = async (req, res, next) => {
    try {
      const { id } = req.params
      const { name, description } =
        req.body

      const updatedCategory = await prisma.categories.update({
        where: {
          id: Number(id)
        },
        data: {
          name,
          description
        }

      })
      return res.status(httpStatus.OK).json(updatedCategory)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const deleteCategory = async (req, res, next) => {
    try {
      const { id } = req.params

      prisma.$use(addSoftDelete)

      await prisma.categories.delete({
        where: {
          id: Number(id)
        }
      })
      return res.status(httpStatus.OK).json({ success: true, message: 'Category deleted successfully' })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }
  return {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
  }
}
