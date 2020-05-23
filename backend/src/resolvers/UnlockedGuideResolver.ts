import { FieldResolver, Resolver, Root } from 'type-graphql'
import { Guide } from '../models/Guide'
import { UnlockedGuide } from '../models/UnlockedGuide'
import { Voucher } from '../models/Voucher'

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
