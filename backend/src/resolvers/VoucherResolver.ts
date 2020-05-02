import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { VoucherInput } from '../inputs/VoucherInput'
import { Context } from '../models/Context'
import { Voucher } from '../models/Voucher'
import { AuthorizationError } from '../utils/errors'

@Resolver(() => Voucher)
export class VoucherResolver {
  @Query(() => Voucher)
  fetchVoucher(@Arg('id', { nullable: true }) id: string, @Arg('code', { nullable: true }) code: string) {
    return id ? Voucher.findOne(id) : Voucher.findOne({ code })
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
      return Voucher.create(data)
    }
  }
}
