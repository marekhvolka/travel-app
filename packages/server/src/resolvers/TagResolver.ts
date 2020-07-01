import { Tag } from '@md/common'
import { GraphQLJSONObject } from 'graphql-type-json'
import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { TagInput } from '../inputs/TagInput'
import { isAuth } from '../middleware/isAuth'

@Resolver(() => Tag)
export class TagResolver {
  @Query(() => Tag)
  fetchTag(@Arg('id', { nullable: false }) id: string) {
    return Tag.findOne(id)
  }

  @Query(() => GraphQLJSONObject)
  @UseMiddleware(isAuth)
  returnNewTag() {
    return Tag.create()
  }

  @Query(() => [Tag])
  tags() {
    return Tag.find({})
  }

  @Mutation(() => Tag)
  @UseMiddleware(isAuth)
  async updateTag(@Arg('data') data: TagInput) {
    if (data.id) {
      await Tag.update(data.id, data)
      return Tag.findOne(data.id)
    } else {
      return Tag.create(data).save()
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  deleteTag(@Arg('id') id: string) {
    Tag.delete(id)
    return true
  }
}
