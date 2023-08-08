import { Router } from 'express'
import { categoryController } from '../controllers/categoryController.js'
import { categoryParamsValidation, categoryValidation } from '../middlewares/validations.js'
import { auth } from '../middlewares/auth.js'

export const categoryRoutes = () => {
  const categoryRouter = Router()
  const { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = categoryController()

  categoryRouter.route('/category')
    .get(getCategories)
    .post(auth, categoryValidation, createCategory)

  categoryRouter.route('/category/:id')
    .get(getCategoryById)
    .put(auth, categoryParamsValidation, categoryValidation, updateCategory)
    .delete(auth, deleteCategory)

  return categoryRouter
}
