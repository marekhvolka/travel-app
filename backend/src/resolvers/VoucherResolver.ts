import { GraphQLJSONObject } from 'graphql-type-json'
import { ObjectID } from 'mongodb'
import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { VoucherInput } from '../inputs/VoucherInput'
import { Context } from '../models/Context'
import { Guide } from '../models/Guide'
import { User } from '../models/User'
import { Voucher } from '../models/Voucher'
import { AuthorizationError } from '../utils/errors'

@Resolver(() => Voucher)
export class VoucherResolver {
  @FieldResolver(() => Guide)
  guide(@Root() voucher: Voucher) {
    return Guide.findOne(voucher.guideId)
  }

  @FieldResolver(() => [User])
  usedBy(@Root() voucher: Voucher) {
    return User.find({
      where: {
        _id: { $in: (voucher.usedByIds || []).map(id => new ObjectID(id)) },
      },
    })
  }

  @Query(() => Voucher)
  fetchVoucher(@Arg('id', { nullable: true }) id: string, @Arg('code', { nullable: true }) code: string) {
    return id ? Voucher.findOne(id) : Voucher.findOne({ code })
  }

  @Query(() => GraphQLJSONObject)
  returnNewVoucher(@Ctx() context: Context) {
    if (!context.user) {
      throw new AuthorizationError('User not authorized')
    }

    return Voucher.create()
  }

  @Query(() => [Voucher])
  vouchers() {
    return Voucher.find({})
  }

  @Mutation(() => Voucher)
  async updateVoucher(@Arg('data') data: VoucherInput, @Ctx() context: Context) {
    if (!context.user) {
      throw new AuthorizationError('User not authorized')
    }

    if (data.id) {
      await Voucher.update(data.id, data)
      return Voucher.findOne(data.id)
    } else {
      return Voucher.create(data).save()
    }
  }

  @Mutation(() => Voucher)
  async useVoucher(@Arg('voucherCode') voucherCode: string, @Ctx() context: Context) {
    if (!context.user) {
      throw new AuthorizationError('User not authorized')
    }

    const voucher = await Voucher.findOne({
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

    await voucher.save()

    await User.update(context.user.id.toString(), {
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
  deleteVoucher(@Arg('id') id: string, @Ctx() context: Context) {
    if (!context.user) {
      throw new AuthorizationError('User not authorized')
    }

    Voucher.delete(id)
    return true
  }
}
