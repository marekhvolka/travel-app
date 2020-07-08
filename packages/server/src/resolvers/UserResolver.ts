import { User } from '@md/common'
import { hash } from 'bcrypt'
import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { getRepository } from 'typeorm'
import { UserInput } from '../inputs/UserInput'
import { isAuth } from '../middleware/isAuth'

const UserRepository = getRepository(User)

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
  users() {
    return UserRepository.find({})
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async updateUser(@Arg('user') user: UserInput) {
    return UserRepository.update(user._id, {
      email: user.email,
      role: user.role,
      passwordHash: await hash(user.password, 10),
    })
  }
}
