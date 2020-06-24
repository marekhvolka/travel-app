import { Request, Response } from 'express'
import { User } from "./User";

export type Context = {
  response: Response
  request: Request
  user: User
}
