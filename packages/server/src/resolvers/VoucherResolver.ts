import { Guide, User, Voucher } from '@md/common'
import { GraphQLJSONObject } from 'graphql-type-json'
import { ObjectID } from 'mongodb'
import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from 'type-graphql'
import { getRepository } from 'typeorm'
import { VoucherInput } from '../inputs/VoucherInput'
import { isAuth } from '../middleware/isAuth'
import { Context } from '../types/Context'

const VoucherRepository = getRepository(Voucher)
const GuideRepository = getRepository(Guide)
const UserRepository = getRepository(User)

@Resolver(() => Voucher)
export class VoucherResolver {
  @FieldResolver(() => Guide)
  guide(@Root() voucher: Voucher) {
    return GuideRepository.findOne(voucher.guideId)
  }

  @FieldResolver(() => [User])
  usedBy(@Root() voucher: Voucher) {
    return UserRepository.find({
      where: {
        _id: { $in: (voucher.usedByIds || []).map(id => new ObjectID(id)) },
      },
    })
  }

  @Query(() => Voucher)
  fetchVoucher(@Arg('id', { nullable: true }) id: string, @Arg('code', { nullable: true }) code: string) {
    return id ? VoucherRepository.findOne(id) : VoucherRepository.findOne({ code })
  }

  @Query(() => GraphQLJSONObject)
  @UseMiddleware(isAuth)
  returnNewVoucher() {
    return VoucherRepository.create()
  }

  @Query(() => [Voucher])
  vouchers() {
    return VoucherRepository.find({})
  }

  @Mutation(() => Voucher)
  @UseMiddleware(isAuth)
  async updateVoucher(@Arg('data') data: VoucherInput) {
    if (data.id) {
      await VoucherRepository.update(data.id, data)
      return VoucherRepository.findOne(data.id)
    } else {
      return VoucherRepository.save(data)
    }
  }

  @Mutation(() => Voucher)
  @UseMiddleware(isAuth)
  async useVoucher(@Arg('voucherCode') voucherCode: string, @Ctx() context: Context) {
    const voucher = await VoucherRepository.findOne({
      code: voucherCode
    })

    if (!voucher) {
      throw new Error('Voucher doesn\'t exists.')
      return
    }

    if (voucher.usedByIds && voucher.maxUsageCount <= voucher.usedByIds.length) {
      throw new Error('Voucher is not valid anymore')
      return
    }

    !voucher.usedByIds && (voucher.usedByIds = [])
    voucher.usedByIds.push(context.user.id.toString())

    await VoucherRepository.save(voucher)

    await UserRepository.update(context.user.id.toString(), {
      unlockedGuides: [
        ...(context.user.unlockedGuides || []),
        {
          guideId: voucher.guideId,
          voucherId: voucher.id.toString(),
          unlockedAt: Date.now(),
        }
      ]
    })

    return voucher
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  deleteVoucher(@Arg('id') id: string) {
    VoucherRepository.delete(id)
    return true
  }
}
