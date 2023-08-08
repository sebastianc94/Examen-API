import httpStatus from '../helpers/httpStatus.js'
import prisma from '../database/prisma.js'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const authController = () => {
  const login = async (req, res, next) => {
    try {
      const { email, password } = req.body
      const customer = await prisma.customers.findUnique({
        where: {
          email
        }
      })

      if (!customer) {
        return res.status(httpStatus.NOT_FOUND).json({ message: "Invalid credentials" })
      }

      const isPasswordValid = await bcrypt.compare(password, customer.password)

      if (!isPasswordValid) {
        return res.status(httpStatus.NOT_FOUND).json({ message: "Invalid credentials" })
      }

      // INGRESÓ CON USUARIO Y CONTRASEÑA CORRECTA :D

      const token = jwt.sign({
        name: customer.full_name,
        role: customer.role
      }, process.env.SECRET_KEY, { expiresIn: '5m' })

      const refreshToken = jwt.sign({
        name: customer.full_name,
        role: customer.role
      }, process.env.SECRET_REFRESH_KEY, { expiresIn: '1h' })

      return res.status(httpStatus.OK).json({
        message: "login successful",
        token,
        refreshToken
      })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const refresh = async (req, res, next) => {
    try {
      const { refreshToken } = req.body

      const decoded = jwt.verify(refreshToken, process.env.SECRET_REFRESH_KEY)

      const token = jwt.sign({
        name: decoded.name,
        role: customer.role
      }, process.env.SECRET_KEY, { expiresIn: '5m' })

      const newRefreshToken = jwt.sign({
        name: decoded.name,
        role: customer.role
      }, process.env.SECRET_REFRESH_KEY, { expiresIn: '1h' })

      res.status(httpStatus.OK).json({
        message: 'Token refreshed successfully',
        token,
        refreshToken: newRefreshToken
      })
    } catch (error) {
      next(error)
    }
  }

  const register = async (req, res, next) => {
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

  return {
    login,
    refresh,
    register
  }
}
