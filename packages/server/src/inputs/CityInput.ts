import { Field, ID, InputType } from 'type-graphql'
import { City } from '@md/common'

@InputType()
export class CityInput implements Partial<City> {
  @Field(() => ID, { nullable: true })
  _id: string

  @Field(() => String)
  name: string
}
