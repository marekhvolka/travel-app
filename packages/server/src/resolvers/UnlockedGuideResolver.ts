import { Guide, UnlockedGuide, Voucher } from '@md/common'
import { FieldResolver, Resolver, Root } from 'type-graphql'

@Resolver(() => UnlockedGuide)
export class UnlockedGuideResolver {
  @FieldResolver(() => Guide)
  guide(@Root() unlockedGuideData: UnlockedGuide) {
    return Guide.findOne(unlockedGuideData.guideId)
  }

  @FieldResolver(() => Voucher)
  voucher(@Root() unlockedGuideData: UnlockedGuide) {
    return Voucher.findOne(unlockedGuideData.voucherId)
  }
}
