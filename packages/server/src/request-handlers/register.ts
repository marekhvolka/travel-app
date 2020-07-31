import { User } from '@md/common'
import { hash } from 'bcrypt'
import { RequestHandler } from 'express'
import { getRepository } from 'typeorm'
import { generateToken } from '../utils/auth-functions'
import { generateId } from '../utils/random'

export const registerRequestHandler: RequestHandler = async (req, res) => {
  const UserRepository = getRepository(User)

  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    return res.send({
      error: {
        message: 'Please enter both email and password'
      }
    })
  }

  const existedUser = await UserRepository.findOne({ email })

  if (existedUser) {
    return res.send({
      error: {
        message: 'User already existed'
      }
    })
  }

  const user = await UserRepository.save({
    _id: generateId(),
    email,
    role: 'player',
    passwordHash: await hash(password.trim(), 10),
  })

  // if (restricted && user.role !== 'admin') {
  //   return {
  //     error: 'Not authorized'
  //   }
  // }

  res.json({
    user,
    token: generateToken(user),
    error: undefined,
  })
}
