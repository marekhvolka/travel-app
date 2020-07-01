import { User } from '@md/common'
import { Request, Response } from 'express'

export type Context = {
  response: Response
  request: Request
  user: User
}
