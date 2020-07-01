import { Field, InputType } from 'type-graphql'

@InputType()
export class DayRestrictionInput {
  @Field(() => String)
  state: string

  @Field(() => String, { nullable: true })
  from: string

  @Field(() => String, { nullable: true })
  to: string
}
