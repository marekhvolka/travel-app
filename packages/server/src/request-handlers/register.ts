import { User } from '@md/common'
import { hash } from 'bcrypt'
import { RequestHandler } from 'express'
import { getRepository } from 'typeorm'
import { generateToken } from '../utils/auth-functions'

export const registerRequestHandler: RequestHandler = async (req, res) => {
  const UserRepository = getRepository(User)

  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    return res.status(400).send({ message: 'Please enter both id and password' })
  }

  const existedUser = await UserRepository.findOne({ email })

  if (existedUser) {
    return res.status(400).send({ message: 'User already existed' })
  }

  const user = await UserRepository.save({
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
