import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { TagInput } from '../inputs/TagInput'
import { Context } from '../models/Context'
import { Tag } from '../models/Tag'
import { AuthorizationError } from '../utils/errors'

@Resolver(() => Tag)
export class TagResolver {
  @Query(() => Tag)
  fetchTag(@Arg('id', { nullable: false }) id: string) {
    return Tag.findOne(id)
  }

  @Query(() => [Tag])
  tags() {
    return Tag.find({})
  }

  @Mutation(() => Tag)
  async updateTag(@Arg('data') data: TagInput, @Ctx() context: Context) {
    if (!context.user) {
      throw new AuthorizationError('User not authorized')
    }

    if (data.id) {
      await Tag.update(data.id, data)
      return Tag.findOne(data.id)
    } else {
      return Tag.create(data)
    }
  }
}
