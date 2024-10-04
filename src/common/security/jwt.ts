import jwt from 'jsonwebtoken'
import { ServiceResponse } from '../models/service.response'
import { NextFunction, Response, Request } from 'express'
import { env } from '@/common/utils/env.config'
import { StatusCodes } from 'http-status-codes'
import { User } from '@prisma/client'

const genToken = (user: User): string =>
  jwt.sign(user, env.SECRET_KEY, { expiresIn: '1h', algorithm: 'HS256' })

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const awuthHeader = req.headers['authorization']
    const token = awuthHeader && awuthHeader.split(' ')[1]

    if (!token)
      throw new Error('unauthorized')

    jwt.verify(token, env.SECRET_KEY, (err) => {
      if (err)
        throw new Error('Failed to authenticate token')

      next()
    })
  } catch (error) {
    const response = ServiceResponse.failure((error as Error).message || 'unauthorized', null, StatusCodes.UNAUTHORIZED)
    return res.status(response.statusCode).send(response)
  }

}

export { genToken, checkToken }