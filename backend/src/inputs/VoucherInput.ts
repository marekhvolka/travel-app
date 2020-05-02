import { BaseEntity, ObjectID } from 'typeorm'
import { Field, ID, InputType } from 'type-graphql'

@InputType()
export class VoucherInput {
  @Field(() => ID)
  id: ObjectID

  @Field(() => String)
  code: string

  @Field(() => Number)
  price: number

  @Field(() => String)
  description: string

  @Field(() => String)
  partnerId: string
}
