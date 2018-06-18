import jwt from 'jsonwebtoken';
import config from '../../config/config';

export function generateToken(user) {
  const u = {
    username: user.username,
    _id: user._id.toString()
  };
  return jwt.sign(u, config.jwt_secret, {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
}

export function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwt_secret, (err, user) => {
      resolve(user);
    });
  });
}
