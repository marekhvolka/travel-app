import { Field, ID, InputType } from 'type-graphql'
import { ObjectID } from 'typeorm'
import { City } from '../models/City'

@InputType()
export class CityInput implements Partial<City> {
  @Field(() => ID, { nullable: true })
  id: ObjectID

  @Field(() => String)
  name: string
}
