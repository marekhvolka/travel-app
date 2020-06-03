import { hash } from 'bcrypt'
import { RequestHandler } from 'express'
import { User } from '../models/User'
import { generateToken } from '../utils/auth-functions'

export const registerRequestHandler: RequestHandler = async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    return res.status(400).send({ message: 'Please enter both id and password' })
  }

  const existedUser = await User.findOne({ email })

  if (existedUser) {
    return res.status(400).send({ message: 'User already existed' })
  }

  const user = await User.create({
    email,
    role: 'player',
    passwordHash: await hash(password.trim(), 10),
  }).save()

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
