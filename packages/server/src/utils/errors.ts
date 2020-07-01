import { NextFunction, Request, Response } from 'express'
import config from '../../config/config'
import { logger } from './logger'

class AppError extends Error {
  name: string
  type: string
  message: string
  status: number

  constructor(message: string, type: string, status: number) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.type = type
    this.message = message
    this.status = status

    const stack = this.stack ? this.stack.split('\n') : this.stack

    logger.error({
      error: {
        name: this.name,
        message,
        type,
        stack: stack && stack.length > 2 ? `${stack[0]} ${stack[1]}` : stack
      }
    })
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = '') {
    super(message, '', 500)
  }
}

export class NotFoundError extends AppError {
  constructor(path: string) {
    super('Path not found: ' + path, '', 404)
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string) {
    super(message, '', 401)
  }
}

export const handleErrors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return await next()
  } catch (err) {
    let responseError = err

    if (!(err instanceof AppError)) {
      logger.error(err)
      responseError = new InternalServerError()
    }

    const isDevelopment = ['local', 'test', 'development'].includes(config.env)

    res.status = responseError.status
    res.send({
      type: responseError.type,
      message: responseError.message,
      stack: isDevelopment && responseError.stack
    })

    return true
  }
}

export const handleNotFound = async (req: Request) => {
  throw new NotFoundError(req.path)
}
