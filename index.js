import express from 'express'
import dotenv from 'dotenv'
import { productRoutes } from './routes/productRouter.js'
import { customerRoutes } from './routes/customerRouter.js'
import { orderRoutes } from './routes/orderRouter.js'
import { categoryRoutes } from './routes/categoryRouter.js'
import { authRoutes } from './routes/authRouter.js'
import errorHandler from './middlewares/errorHandler.js'
import cors from 'cors'
import { expressjwt as jwt } from 'express-jwt'

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use(cors({
  origin: '*'
}))

app.use(
  jwt({
    secret: process.env.SECRET_KEY,
    algorithms: ['HS256']
  }).unless({ path: ["/api/auth/login", "api/auth/refresh", "api/auth/register"] })
)

app.use('/api', authRoutes(), productRoutes(), customerRoutes(), orderRoutes(), categoryRoutes())

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`port ${PORT} started! 🚀`)
})
