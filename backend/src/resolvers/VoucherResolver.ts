import { Voucher } from '../models/Voucher'
import {Arg, Mutation, Query, Resolver} from "type-graphql";

@Resolver(() => Voucher)
export class VoucherResolver {
  @Query(() => Voucher)
  fetchVoucher(
    @Arg("id", {nullable: true}) id: string,
    @Arg("code", {nullable: true}) code: string) {
    return id ? Voucher.findOne(id) : Voucher.findOne({ code })
  }

  @Query(() => [Voucher])
  vouchers() {
    return Voucher.find({})
  }

  @Mutation(() => Voucher)
  updateVoucher(_, { data }) {
    return data.id ? Voucher.update(data.id, data) : Voucher.create(data)
  }
}
