import { Field, ID, InputType, Int } from 'type-graphql'

@InputType()
export class VoucherInput {
  @Field(() => ID, { nullable: true })
  _id: string

  @Field(() => String)
  code: string

  @Field(() => Int)
  price: number

  @Field(() => String)
  description: string

  @Field(() => String)
  guideId: string

  @Field(() => String, { nullable: true })
  partnerId: string

  @Field(() => Int)
  maxUsageCount: number

  @Field(() => [String], { nullable: true })
  usedByIds?: string[]
}
