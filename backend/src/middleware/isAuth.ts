import { MiddlewareFn } from 'type-graphql'
import { Context } from '../models/Context'
import { AuthorizationError } from '../utils/errors'

export const isAuth: MiddlewareFn<Context> = ({context}, next) => {
  if (!context.user) {
    throw new AuthorizationError('User not authorized')
  }

  return next()
}
