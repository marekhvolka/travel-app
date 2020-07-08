import { User } from '@md/common'
import jwt, { VerifyErrors } from 'jsonwebtoken'
import config from '../../config/config'

export function generateToken(user: User) {
  const u = {
    email: user.email,
    _id: user._id,
  }
  return jwt.sign(u, config.jwt_secret, {
    expiresIn: 60 * 60 * 24, // expires in 24 hours
  })
}

export function verifyToken(token: string) {
  return new Promise(resolve => {
    jwt.verify(token, config.jwt_secret, (err: VerifyErrors | null, user: any) => {
      resolve(user)
    })
  })
}
