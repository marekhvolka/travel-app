import { hash } from 'bcrypt'
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { UserInput } from '../inputs/UserInput'
import { Context } from '../models/Context'
import { User } from '../models/User'
import { AuthorizationError } from '../utils/errors'

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
  users() {
    return User.find({})
  }

  @Mutation(() => User)
  async updateUser(@Arg('user') user: UserInput, @Ctx() context: Context) {
    if (!context.user) {
      throw new AuthorizationError('User not authorized')
    }

    return User.update(user.id, {
      email: user.email,
      role: user.role,
      passwordHash: await hash(user.password, 10),
    })
  }
}
