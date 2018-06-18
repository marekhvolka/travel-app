import * as bcrypt from 'bcrypt'
import { User } from '../../models/index'

export const resolver = {
  User: {},

  Query: {
    // Fetch all users
    users() {
      return User.find({})
    },
  },

  Mutation: {
    // Update a particular user
    updateUser(_, { id, firstName, lastName, email, password, role }) {
      return User.findByIdAndUpdate(id, {
        firstName,
        lastName,
        email,
        role,
        passwordHash: bcrypt.hash(password, 10)
      })
    },
  }
}
