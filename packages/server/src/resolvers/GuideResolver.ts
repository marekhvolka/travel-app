import { Guide, Item, Voucher } from '@md/common'
import { GraphQLJSONObject } from 'graphql-type-json'
import { ObjectID } from 'mongodb'
import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from 'type-graphql'
import { getRepository } from 'typeorm'
import { GuideInput } from '../inputs/GuideInput'
import { isAuth } from '../middleware/isAuth'

const GuideRepository = getRepository(Guide)
const ItemRepository = getRepository(Item)
const VoucherRepository = getRepository(Voucher)

@Resolver(() => Guide)
export class GuideResolver {
  @FieldResolver(() => [Item])
  items(@Root() guide: Guide, @Arg('published', { nullable: true }) published: boolean) {
    return ItemRepository.find({
      where: {
        _id: { $in: guide.itemIds.map(id => new ObjectID(id)) },
        ...(published ? { published: true } : {})
      },
    })
  }

  @FieldResolver(() => [Voucher])
  vouchers(@Root() guide: Guide) {
    return VoucherRepository.find({
      where: {
        guideId: guide.id,
      },
    })
  }

  @Query(() => Guide)
  fetchGuide(@Arg('id', { nullable: true }) id: string, @Arg('url', { nullable: true }) url: string) {
    return id ? GuideRepository.findOne(id) : GuideRepository.findOne({ url })
  }

  @Query(() => GraphQLJSONObject)
  @UseMiddleware(isAuth)
  returnNewGuide() {
    return GuideRepository.create()
  }

  @Query(() => [Guide])
  guides() {
    return GuideRepository.find()
  }

  @Mutation(() => Guide)
  @UseMiddleware(isAuth)
  async updateGuide(@Arg('data') data: GuideInput) {
    if (data.id) {
      await GuideRepository.update(data.id, data)
      return GuideRepository.findOne(data.id)
    } else {
      return GuideRepository.save(data)
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  deleteGuide(@Arg('id') id: string) {
    GuideRepository.delete(id)
    return true
  }
}
