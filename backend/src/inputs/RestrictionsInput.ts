import {Field, InputType} from "type-graphql";
import {DayRestrictionsInput} from "./DayRestrictionsInput";

@InputType()
export class RestrictionsInput {

  @Field(() => String)
  state: string

  @Field(() => DayRestrictionsInput)
  dayRestrictions: DayRestrictionsInput
}
