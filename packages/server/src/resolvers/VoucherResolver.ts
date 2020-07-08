import { Guide, User, Voucher } from '@md/common'
import { GraphQLJSONObject } from 'graphql-type-json'
import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from 'type-graphql'
import { getRepository } from 'typeorm'
import { VoucherInput } from '../inputs/VoucherInput'
import { isAuth } from '../middleware/isAuth'
import { Context } from '../types/Context'
import { generateId } from '../utils/random'

const VoucherRepository = getRepository(Voucher)
const GuideRepository = getRepository(Guide)
const UserRepository = getRepository(User)

@Resolver(() => Voucher)
export class VoucherResolver {
  @FieldResolver(() => Guide)
  guide(@Root() voucher: Voucher) {
    return GuideRepository.findOne({ _id: voucher.guideId })
  }

  @FieldResolver(() => [User])
  usedBy(@Root() voucher: Voucher) {
    return UserRepository.find({
      where: {
        _id: { $in: (voucher.usedByIds || []) },
      },
    })
  }

  @Query(() => Voucher)
  fetchVoucher(@Arg('id', { nullable: true }) _id: string, @Arg('code', { nullable: true }) code: string) {
    return _id ? VoucherRepository.findOne({ _id }) : VoucherRepository.findOne({ code })
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
    if (data._id) {
      await VoucherRepository.update(data._id, data)
      return VoucherRepository.findOne(data._id)
    } else {
      return VoucherRepository.save({
        ...data,
        _id: generateId()
      })
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
    voucher.usedByIds.push(context.user._id)

    await VoucherRepository.save(voucher)

    await UserRepository.update(context.user._id, {
      unlockedGuides: [
        ...(context.user.unlockedGuides || []),
        {
          guideId: voucher.guideId,
          voucherId: voucher._id,
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
