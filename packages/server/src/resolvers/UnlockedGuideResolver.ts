import { Guide, UnlockedGuide, Voucher } from '@md/common'
import { FieldResolver, Resolver, Root } from 'type-graphql'
import { getRepository } from 'typeorm'

@Resolver(() => UnlockedGuide)
export class UnlockedGuideResolver {
  @FieldResolver(() => Guide)
  guide(@Root() unlockedGuideData: UnlockedGuide) {
    return getRepository(Guide).findOne(unlockedGuideData.guideId)
  }

  @FieldResolver(() => Voucher)
  voucher(@Root() unlockedGuideData: UnlockedGuide) {
    return getRepository(Voucher).findOne(unlockedGuideData.voucherId)
  }
}
