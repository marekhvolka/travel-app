import { Tag } from '@md/common'
import { GraphQLJSONObject } from 'graphql-type-json'
import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { getRepository } from 'typeorm'
import { TagInput } from '../inputs/TagInput'
import { isAuth } from '../middleware/isAuth'
import { generateId } from '../utils/random'

const TagRepository = getRepository(Tag)

@Resolver(() => Tag)
export class TagResolver {
  @Query(() => Tag)
  fetchTag(@Arg('id', { nullable: false }) _id: string) {
    return TagRepository.findOne({ _id })
  }

  @Query(() => GraphQLJSONObject)
  @UseMiddleware(isAuth)
  returnNewTag() {
    return TagRepository.create()
  }

  @Query(() => [Tag])
  tags() {
    return TagRepository.find({})
  }

  @Mutation(() => Tag)
  @UseMiddleware(isAuth)
  async updateTag(@Arg('data') data: TagInput) {
    if (data._id) {
      await TagRepository.update(data._id, data)
      return TagRepository.findOne(data._id)
    } else {
      return TagRepository.save({
        ...data,
        _id: generateId()
      })
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  deleteTag(@Arg('id') id: string) {
    TagRepository.delete(id)
    return true
  }
}
