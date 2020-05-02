import { ObjectID } from 'mongodb'
import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { GuideInput } from '../inputs/GuideInput'
import { Context } from '../models/Context'
import { Guide } from '../models/Guide'
import { Item } from '../models/Item'
import { AuthorizationError } from '../utils/errors'

@Resolver(() => Guide)
export class GuideResolver {
  @FieldResolver(() => [Item])
  items(@Root() guide: Guide) {
    return Item.find({
      where: {
        _id: { $in: guide.itemIds.map(id => new ObjectID(id)) },
      },
    })
  }

  @Query(() => Guide)
  fetchGuide(@Arg('id', { nullable: true }) id: string, @Arg('url', { nullable: true }) url: string) {
    return id ? Guide.findOne(id) : Guide.findOne({ url })
  }

  @Query(() => [Guide])
  guides() {
    return Guide.find()
  }

  @Mutation(() => Guide)
  async updateGuide(@Arg('data') data: GuideInput, @Ctx() context: Context) {
    if (!context.user) {
      throw new AuthorizationError('User not authorized')
    }

    if (data.id) {
      await Guide.update(data.id, data)
      return Guide.findOne(data.id)
    } else {
      return Guide.create(data)
    }
  }
}
