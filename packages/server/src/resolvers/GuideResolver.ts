import { GraphQLJSONObject } from 'graphql-type-json'
import { ObjectID } from 'mongodb'
import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from 'type-graphql'
import { GuideInput } from '../inputs/GuideInput'
import { isAuth } from '../middleware/isAuth'
import { Guide, Item, Voucher } from '@md/common'

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
  @UseMiddleware(isAuth)
  returnNewGuide() {
    return Guide.create()
  }

  @Query(() => [Guide])
  guides() {
    return Guide.find()
  }

  @Mutation(() => Guide)
  @UseMiddleware(isAuth)
  async updateGuide(@Arg('data') data: GuideInput) {
    if (data.id) {
      await Guide.update(data.id, data)
      return Guide.findOne(data.id)
    } else {
      return Guide.create(data).save()
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  deleteGuide(@Arg('id') id: string) {
    Guide.delete(id)
    return true
  }
}
