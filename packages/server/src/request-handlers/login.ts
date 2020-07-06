import { User } from '@md/common'
import { compare } from 'bcrypt'
import { RequestHandler } from 'express'
import { getRepository } from 'typeorm'
import { generateToken } from '../utils/auth-functions'


export const loginRequestHandler: RequestHandler = async (req, res) => {
  const UserRepository = getRepository(User)

  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    return res.status(400).send({ message: 'Please enter both id and password' })
  }

  const user = await UserRepository.findOne({ email })

  if (!user) {
    return res.status(400).send({ message: 'Invalid credentials!' })
  }

  const valid = await compare(password, user.passwordHash)

  if (!valid) {
    return res.status(400).send({ message: 'Invalid credentials!' })
  }

  // if (restricted && user.role !== 'admin') {
  //   return {
  //     error: 'Not authorized'
  //   }
  // }

  const token = generateToken(user)

  UserRepository.update({ email }, { token })

  res.json({
    user,
    token,
    error: undefined,
  })
}
