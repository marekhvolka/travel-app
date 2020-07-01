import { Field, InputType } from 'type-graphql'
import { DayRestrictionInput } from './DayRestrictionInput'

@InputType()
export class DayRestrictionsInput {
  @Field(() => DayRestrictionInput)
  mon: DayRestrictionInput

  @Field(() => DayRestrictionInput)
  tue: DayRestrictionInput

  @Field(() => DayRestrictionInput)
  wed: DayRestrictionInput

  @Field(() => DayRestrictionInput)
  thu: DayRestrictionInput

  @Field(() => DayRestrictionInput)
  fri: DayRestrictionInput

  @Field(() => DayRestrictionInput)
  sat: DayRestrictionInput

  @Field(() => DayRestrictionInput)
  sun: DayRestrictionInput
}
