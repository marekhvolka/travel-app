import { GraphQLJSONObject } from 'graphql-type-json'
import { ObjectID } from 'mongodb'
import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { GuideInput } from '../inputs/GuideInput'
import { Context } from '../models/Context'
import { Guide } from '../models/Guide'
import { Item } from '../models/Item'
import { Voucher } from '../models/Voucher'
import { AuthorizationError } from '../utils/errors'

@Resolver(() => Guide)
export class GuideResolver {
  @FieldResolver(() => [Item])
  items(@Root() guide: Guide, @Arg('published', { nullable: true }) published: boolean) {
    return Item.find({
      where: {
        _id: { $in: guide.itemIds.map(id => new ObjectID(id)) },
        ...(published ? { published: true } : {})
      },
    })
  }

  @FieldResolver(() => [Voucher])
  vouchers(@Root() guide: Guide) {
    return Voucher.find({
      where: {
        guideId: guide.id,
      },
    })
  }

  @Query(() => Guide)
  fetchGuide(@Arg('id', { nullable: true }) id: string, @Arg('url', { nullable: true }) url: string) {
    return id ? Guide.findOne(id) : Guide.findOne({ url })
  }

  @Query(() => GraphQLJSONObject)
  returnNewGuide(@Ctx() context: Context) {
    if (!context.user) {
      throw new AuthorizationError('User not authorized')
    }

    return Guide.create()
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
      return Guide.create(data).save()
    }
  }

  @Mutation(() => Boolean)
  deleteGuide(@Arg('id') id: string, @Ctx() context: Context) {
    if (!context.user) {
      throw new AuthorizationError('User not authorized')
    }

    Guide.delete(id)
    return true
  }
}
