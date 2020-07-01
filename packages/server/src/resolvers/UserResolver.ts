import { User } from '@md/common'
import { hash } from 'bcrypt'
import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { UserInput } from '../inputs/UserInput'
import { isAuth } from '../middleware/isAuth'

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
  users() {
    return User.find({})
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async updateUser(@Arg('user') user: UserInput) {
    return User.update(user.id, {
      email: user.email,
      role: user.role,
      passwordHash: await hash(user.password, 10),
    })
  }
}
