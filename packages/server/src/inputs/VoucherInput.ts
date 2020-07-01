import { Field, ID, InputType, Int } from 'type-graphql'
import { ObjectID } from 'typeorm'

@InputType()
export class VoucherInput {
  @Field(() => ID, { nullable: true })
  id: ObjectID

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

  @Field(() => [String])
  usedByIds: string[]
}
