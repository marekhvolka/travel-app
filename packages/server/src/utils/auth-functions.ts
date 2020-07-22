import { User } from '@md/common'
import jwt, { VerifyErrors } from 'jsonwebtoken'
import { config } from '../config'

export function generateToken(user: User) {
  const u = {
    email: user.email,
    _id: user._id,
  }
  return jwt.sign(u, config.jwtSecret, {
    expiresIn: 60 * 60 * 24, // expires in 24 hours
  })
}

export function verifyToken(token: string) {
  return new Promise(resolve => {
    jwt.verify(token, config.jwtSecret, (err: VerifyErrors | null, user: any) => {
      resolve(user)
    })
  })
}
