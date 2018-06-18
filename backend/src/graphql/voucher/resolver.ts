import { Voucher } from '../../models/index'

export const resolver = {
  Query: {
    fetchVoucher(_, { id, code }) {
      return id ? Voucher.findById(id) : Voucher.findOne({ code })
    },
    vouchers() {
      return Voucher.find({})
    }
  },

  Mutation: {
    updateVoucher(_, { data }) {
      return data.id ? Voucher.findByIdAndUpdate(data.id, data) : Voucher.create(data)
    },
  }
}
