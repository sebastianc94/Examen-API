import { Router } from 'express'
import { productController } from '../controllers/productController.js'
import { productParamsValidation, productValidation } from '../middlewares/validations.js'
import { auth } from '../middlewares/auth.js'

export const productRoutes = () => {
  const productRouter = Router()
  const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = productController()

  productRouter.route('/products')
    .get(getProducts)
    .post(auth, productValidation, createProduct)

  productRouter.route('/products/:id')
    .get(getProductById)
    .put(auth, productParamsValidation, productValidation, updateProduct)
    .delete(auth, deleteProduct)

  return productRouter
}
