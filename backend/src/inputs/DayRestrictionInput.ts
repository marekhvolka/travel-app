import { Field, InputType } from 'type-graphql'

@InputType()
export class DayRestrictionInput {
  @Field(() => String)
  state: string

  @Field({ nullable: true })
  from: string

  @Field({ nullable: true })
  to: string
}
